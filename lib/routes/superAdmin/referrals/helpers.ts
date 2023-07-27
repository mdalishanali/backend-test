import { Referrals } from '../../../db';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export class ReferralHelpers {
  public static findAll = async (query: any) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
    const filter = query.filter;
    let applyFilter = [];

    if (filter?.createdAt) {
      const dateQuery = {
        createdAt: {},
      };
      if (filter?.createdAt.from) {
        dateQuery.createdAt['$gte'] = new Date(filter.createdAt.from);
      }
      if (filter?.createdAt.to) {
        dateQuery.createdAt['$lte'] = new Date(filter.createdAt.to);
      }
      applyFilter.push(dateQuery);
    }

    if (applyFilter.length) {
      allFilter['$and'] = applyFilter;
    }
    const matchQuery = {
      $match: allFilter,
    };

    const referredByLookup = {
      $lookup: {
        from: 'users',
        localField: 'referredByRef',
        foreignField: '_id',
        as: 'referredBy',
      },
    };

    const referredToLookup = {
      $lookup: {
        from: 'users',
        localField: 'referredToRef',
        foreignField: '_id',
        as: 'referredTo',
      },
    };

    const referredBy = {
      $addFields: {
        referredBy: {
          $arrayElemAt: ['$referredBy', 0],
        },
      },
    };

    const referredTo = {
      $addFields: {
        referredTo: {
          $arrayElemAt: ['$referredTo', 0],
        },
      },
    };

    const sortingQuery = {
      $sort: {
        createdAt: -1,
      },
    };

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
            $count: 'count',
          },
        ],
      },
    };

    let aggregatePipeline: any = [
      referredByLookup,
      referredToLookup,
      referredBy,
      referredTo,
    ];

    if (searchValue.length) {
      const searchQuery = {
        $match: {
          $or: [
            { 'referredTo.name.first': { $regex: searchValue, $options: 'i' } },
            { 'referredTo.name.last': { $regex: searchValue, $options: 'i' } },
            { 'referredBy.name.first': { $regex: searchValue, $options: 'i' } },
            { 'referredBy.name.last': { $regex: searchValue, $options: 'i' } },
          ],
        },
      };

      aggregatePipeline = [...aggregatePipeline, searchQuery];
    }

    aggregatePipeline = [
      ...aggregatePipeline,
      matchQuery,
      sortingQuery,
      paginationQuery,
    ];

    const data = await Referrals.aggregate(aggregatePipeline);

    return data;
  };
}
