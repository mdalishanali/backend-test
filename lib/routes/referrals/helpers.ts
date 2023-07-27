import { Referrals } from '../../db';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export class ReferralHelpers {
  public static findAll = async (query: any) => {
    const { referredBy } = query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
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

    const referredToLookup = {
      $lookup: {
        from: 'users',
        localField: 'referredToRef',
        foreignField: '_id',
        as: 'referredTo',
      },
    };

    const unwindQuery = {
      $unwind: {
        path: '$referredTo',
      },
    };

    const referredTo = {
      $addFields: {
        referredTo: {
          $concat: ['$referredTo.name.first', ' ', '$referredTo.name.last'],
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
        totalRewards: [
          {
            $group: {
              _id: null,
              totalPoints: { $sum: '$points' },
            },
          },
          {
            $project: {
              _id: 0,
              totalPoints: '$totalPoints',
            },
          },
        ],
      },
    };

    let aggregatePipeline = [
      {
        $match: { referredByRef: ObjectId(referredBy) },
      },
      referredToLookup,
      matchQuery,
      unwindQuery,
      referredTo,
      sortingQuery,
      paginationQuery,
    ];

    const data = await Referrals.aggregate(aggregatePipeline);

    return data;
  };
}
