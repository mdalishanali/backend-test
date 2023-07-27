
// NPM Dependencies
import * as status from 'http-status';
import * as StandardError from 'standard-error';

// Internal Dependencies
import { Orders } from '../../db';
export class OrdersHelpers {

  public static findOne = async (id: string, companyId?: string) => {
    return await Orders
      .findOne({ _id: id, })
      .populate('productId').populate('userId');
  };

  public static findAll = async (query, user) => {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
    const filter = query.filter;
    let applyFilter = [];

    const addToAllFilter = (query) => {
      if (allFilter['$and'] && allFilter['$and'].length) {
        allFilter['$and'] = [...allFilter['$and'], query]
      } else {
        allFilter['$and'] = [query]
      }
    }

    if (filter && Object.keys(filter).length) {
      const searchFilter = ["name"]
      searchFilter.forEach((key) => {
        if (filter[key]) {
          const data = {
            [key]: filter[key],
          };
          applyFilter.push(data);
        }
      });
    }

    if (filter?.price) {
      const query = numberQuery(filter.price, 'product.price')
      query ? applyFilter.push(query) : null;
    }

    if (filter?.sellerName?.length) {
      allFilter['seller.fullName'] = new RegExp(filter?.sellerName, 'i')
    }

    // purchaseDate

    if (filter?.purchaseDate) {
      const dateQuery = {
        createdAt: {
        }
      }
      if (filter?.purchaseDate.from) {
        dateQuery.createdAt['$gte'] = new Date(filter.purchaseDate.from)
      }
      if (filter?.purchaseDate.to) {
        dateQuery.createdAt['$lte'] = new Date(filter.purchaseDate.to)
      }
      applyFilter.push(dateQuery);
    }

    if (filter?.ByStatus?.length) {
      allFilter['paymentStatus'] = filter?.ByStatus;
    }

    if (searchValue.length) {
      allFilter['product.name'] = new RegExp(searchValue, 'i')
    }

    if (applyFilter.length) {
      allFilter.$and = applyFilter
    }

    if (filter?.category?.length) {
      allFilter.category = {
        '$in': filter.category
      }
    }



    const matchQuery = {
      $match: allFilter
    }


    const productLookupQuery = {
      "$lookup": {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      }
    }


    const sellerLookupQuery = {
      "$lookup": {
        from: 'users',
        localField: 'product.createdBy',
        foreignField: '_id',
        as: 'seller',
      }
    }

    const addSellerFullName = {
      $addFields: {
        'seller.fullName': {
          $concat: [
            '$seller.name.first',
            ' ',
            '$seller.name.last'
          ]
        }
      }
    }
    const unwindQuery = [{ "$unwind": { path: "$seller" } }, { "$unwind": { path: "$product" } }]


    // allFilter['userId'] = user._id;



    const paginationQuery = {
      $facet: {
        data: [
          {
            $skip: skips,
          },
          {
            $limit: limit,
          },
        ],
        count: [
          {
            $count: "count",
          },
        ],
      },
    }

    const sortingQuery = {
      $sort: {
        createdAt: -1
      }
    }
    let aggregatePipeline = [
      sortingQuery,
      productLookupQuery,
      sellerLookupQuery,
      ...unwindQuery,
      addSellerFullName,
      matchQuery,
      paginationQuery
    ]
    const data = await Orders.aggregate(aggregatePipeline)
    return data;
  }
  public static findAndUpdate = async ({ id, update }) => {
    return await Orders
      .findByIdAndUpdate(id, update, { new: true })
      .populate('');
  }
  public static create = async (document) => {

    return await Orders
      .create(document);
  };
  public static softDelete = async (id, user) => {
    const data = await Orders
      .findByIdAndUpdate(id, { isVisible: false }).setOptions({
        deleteOperation: true,
        user,
      });
    return data
  }
  public static authenticate = (doc, user) => {
    if (doc.companyId.toString() !== user.companyId._id.toString()) {
      throw new StandardError({ message: 'This document does not belong to the user', code: status.UNAUTHORIZED })
    }
  }
}

const dateFilterQuery = (filter, key) => {
  if (filter?.from && filter?.to) {
    const dateQuery = {
      [key]: {
        $gte: new Date(filter.from),
        $lt: new Date(filter.to)
      }
    }
    return dateQuery;
  }
}

const numberQuery = (filter, key) => {
  if (filter?.min && filter?.max) {
    const numberQuery = {
      [key]: {
        $gte: parseInt(filter.min),
        $lte: parseInt(filter.max),
      }
    }
    return numberQuery;
  }
}

const regexSearchQuery = (key, value) => {
  return { [key]: { $regex: '_*' + value + "_*", $options: "i" } }
}
