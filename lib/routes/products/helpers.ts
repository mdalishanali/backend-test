
// NPM Dependencies
import * as status from 'http-status';
import * as StandardError from 'standard-error';

// Internal Dependencies
import { Products } from '../../db';
export class ProductsHelpers {

  public static findOne = async (id: string, companyId?: string) => {
    return Products
      .findOne({ _id: id, })
      .populate('');
  };

  public static findAll = async (query, user) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter = {};
    const filter = query.filter;
    let applyFilter = [];


    if (filter?.price) {
      const query = numberQuery(filter.price, 'price')
      query ? applyFilter.push(query) : null;
    }

    if (filter?.createdAt) {
      const dateQuery = {
        createdAt: {
        }
      }
      if (filter?.createdAt.from) {
        dateQuery.createdAt['$gte'] = new Date(filter.createdAt.from)
      }
      if (filter?.createdAt.to) {
        dateQuery.createdAt['$lte'] = new Date(filter.createdAt.to)
      }
      applyFilter.push(dateQuery);
    }

    if (filter?.sellerName?.length) {
      allFilter['seller.fullName'] = new RegExp(filter?.sellerName, 'i')
    }



    if (applyFilter.length) {
      allFilter['$and'] = applyFilter
    }
    const matchQuery = {
      $match: allFilter
    }

    const sellerLookupQuery = {
      "$lookup": {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'seller',
      }
    }
    const unwindQuery = { "$unwind": { path: "$seller" } }

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

    let aggregatePipeline = [
      sellerLookupQuery,
      unwindQuery,
      addSellerFullName,
      matchQuery,
      paginationQuery
    ]

    if (searchValue.length) {
      const searchQuery = { $match: { $text: { $search: searchValue } } };
      aggregatePipeline = [searchQuery, ...aggregatePipeline]
    }
    const data = await Products.aggregate(aggregatePipeline)
    return data;
  }
  public static findAndUpdate = async ({ id, update }) => {
    return Products
      .findByIdAndUpdate(id, update, { new: true })
      .populate('');
  }
  public static create = async (document) => {
    return await Products
      .create(document);
  };
  public static softDelete = async (id, user) => {
    const data = await Products
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
