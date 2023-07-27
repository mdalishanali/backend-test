
// NPM Dependencies
import * as status from 'http-status';
import * as StandardError from 'standard-error';

// Internal Dependencies
import { Products } from '../../../db';
export class ProductsHelpers {
  public static findOne = async (id: string) => {
    return Products
      .findById(id)
      .populate('');
  };

  public static findAll = async (query, user) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
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

    if (applyFilter.length) {
      allFilter.$and = applyFilter
    }
    if (filter?.category?.length) {
      allFilter.category = {
        '$in': filter.category
      }
    }

    const sellerLookupQuery = {
      "$lookup": {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'seller',
      }
    }

    const ordersCountQuery = {
      "$lookup": {
        from: 'orders',
        localField: '_id',
        foreignField: 'productId',
        as: 'ordersCount',
      }
    }

    const calculateOrdersCount = {
      '$addFields': {
        'ordersCount': {
          '$size': '$ordersCount'
        },
      }
    }

    const unwindQuery = [
      { "$unwind": { path: "$seller" } }
    ]
    // this will return only that doc associated with the sellers
    allFilter.createdBy = user._id;
    allFilter.isVisible = true;

    const matchQuery = {
      $match: allFilter
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
      ordersCountQuery,
      calculateOrdersCount,
      ...unwindQuery,
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
    return Products
      .create(document);
  };
  public static softDelete = async (id) => {
    await Products
      .findByIdAndUpdate(id, { isVisible: false });
    return { del: 'ok' }
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

