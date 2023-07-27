// Internal Dependencies
import { Refund } from '../../../db';
import { PaginatedSearchQuery } from '../../../interfaces/query';
import { RefundInterface } from '../../../interfaces/schemaInterface';

export class RefundHelpers {
  public static findOne = async (id: string) => {
    const data = await Refund.findById(id).populate('');
    return data;
  }

  public static findAll = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
    const filter = query.filter;
    let applyFilter = [];


    if (filter?.price) {
      const query = numberQuery(filter.price, 'product.price')
      query ? applyFilter.push(query) : null;
    }

    if (filter?.customer?.length) {
      allFilter['user.fullName'] = new RegExp(filter?.customer, 'i')
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
      allFilter['status'] = filter?.ByStatus;
    }

    if (searchValue.length) {
      allFilter['product.name'] = new RegExp(searchValue, 'i')
    }

    if (applyFilter.length) {
      allFilter.$and = applyFilter
    }


    const orderLookupQuery = {
      "$lookup": {
        from: 'orders',
        localField: 'orderRef',
        foreignField: '_id',
        as: 'order',
      }
    }

    const orderUnwindQuery = { "$unwind": { path: "$order" } }

    const productLookupQuery = {
      "$lookup": {
        from: 'products',
        localField: 'order.productId',
        foreignField: '_id',
        as: 'product',
      }
    }
    const productUnwindQuery = { "$unwind": { path: "$product" } }


    const orderUserLookupQuery = {
      "$lookup": {
        from: 'users',
        localField: 'order.userId',
        foreignField: '_id',
        as: 'user',
      }
    }
    const orderUserUnwindQuery = { "$unwind": { path: "$user" } }

    const addOrderUserFullName = {
      $addFields: {
        'user.fullName': {
          $concat: [
            '$user.name.first',
            ' ',
            '$user.name.last'
          ]
        }
      }
    }

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

    const sortingQuery = {
      $sort: {
        createdAt: -1
      }
    }

    let aggregatePipeline = [
      sortingQuery,
      orderLookupQuery,
      orderUnwindQuery,
      productLookupQuery,
      productUnwindQuery,
      orderUserLookupQuery,
      orderUserUnwindQuery,
      addOrderUserFullName,
      matchQuery,
      paginationQuery
    ];
    const data = await Refund.aggregate(aggregatePipeline)
    return data;
  }

  public static findAndUpdate = async ({ id, update }: { id: string, update: RefundInterface }) => {
    const data = await Refund.findByIdAndUpdate(id, update, { new: true }).populate(
      ''
    );
    return data;
  }

  public static create = async (document: RefundInterface) => {
    const data = await Refund.create(document);
    return data;
  }

  public static softDelete = async (id: string) => {
    const data = await Refund.findByIdAndUpdate(id, { isVisible: false });
    return data;
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
