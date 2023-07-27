// NPM Dependencies
import * as status from 'http-status';
import { Subscription, SubscriptionPlan } from '../../../db';
import * as StandardError from 'standard-error';
import { config } from '../../../config';
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

// Internal Dependencies
export class SubscriptionHelpers {
  public static findAll = async (query: any) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
    const filter = query.filter;
    let applyFilter = [];

    if (filter?.type) {
      applyFilter.push({ 'subscriptionPlan.type': filter.type });
    }
    if (filter?.status) {
      applyFilter.push({ status: filter.status });
    }
    if (filter?.price) {
      const query = numberQuery(filter.price, 'subscriptionPlan.type');
      query ? applyFilter.push(query) : null;
    }

    if (filter?.subscriptionStartDate) {
      const dateQuery = {
        currentPeriodStarts: {},
      };
      if (filter?.subscriptionStartDate.from) {
        dateQuery.currentPeriodStarts['$gte'] = Math.floor(
          new Date(filter.subscriptionStartDate.from).getTime() / 1000
        );
      }
      if (filter?.subscriptionStartDate.to) {
        dateQuery.currentPeriodStarts['$lte'] = Math.floor(
          new Date(filter.subscriptionStartDate.to).getTime() / 1000
        );
      }
      applyFilter.push(dateQuery);
    }

    if (filter?.subscriptionEndDate) {
      const dateQuery = {
        currentPeriodEnds: {},
      };
      if (filter?.subscriptionEndDate.from) {
        dateQuery.currentPeriodEnds['$gte'] = Math.floor(
          new Date(filter.subscriptionEndDate.from).getTime() / 1000
        );
      }
      if (filter?.subscriptionEndDate.to) {
        dateQuery.currentPeriodEnds['$lte'] = Math.floor(
          new Date(filter.subscriptionEndDate.to).getTime() / 1000
        );
      }
      applyFilter.push(dateQuery);
    }

    if (applyFilter.length) {
      allFilter['$and'] = applyFilter;
    }

    const matchQuery = {
      $match: allFilter,
    };

    const userLookupQuery = {
      $lookup: {
        from: 'users',
        localField: 'userRef',
        foreignField: '_id',
        as: 'user',
      },
    };
    const subscriptionPlanLookupQuery = {
      $lookup: {
        from: 'subscriptionplans',
        localField: 'subscriptionPlanRef',
        foreignField: '_id',
        as: 'subscriptionPlan',
      },
    };

    const addFieldUser = {
      $addFields: {
        user: { $arrayElemAt: ['$user', 0] },
      },
    };
    const addFieldsSubscriptionPlan = {
      $addFields: {
        subscriptionPlan: { $arrayElemAt: ['$subscriptionPlan', 0] },
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
      userLookupQuery,
      subscriptionPlanLookupQuery,
      addFieldUser,
      addFieldsSubscriptionPlan,
    ];

    if (searchValue.length) {
      const searchQuery = {
        $match: {
          $or: [
            {
              'user.name.first': { $regex: searchValue, $options: 'i' },
            },
            {
              'user.name.last': { $regex: searchValue, $options: 'i' },
            },
            {
              'subscriptionPlan.name': {
                $regex: searchValue,
                $options: 'i',
              },
            },
          ],
        },
      };

      aggregatePipeline = [...aggregatePipeline, searchQuery];
    }

    aggregatePipeline = [...aggregatePipeline, matchQuery, paginationQuery];

    const data = await Subscription.aggregate(aggregatePipeline);
    return data;
  };

  public static findAllPlans = async (query: any) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.pageSize) || 50;
    const skips = (page - 1) * limit;
    const searchValue = query.searchValue;
    const allFilter: any = {};
    const filter = query.filter;
    let applyFilter = [];

    if (filter?.price) {
      const query = numberQuery(filter.price, 'price');
      query ? applyFilter.push(query) : null;
    }

    if (filter?.createdDate) {
      const dateQuery = {
        createdAt: {},
      };
      if (filter?.createdDate.from) {
        dateQuery.createdAt['$gte'] = new Date(filter.createdDate.from);
      }
      if (filter?.createdDate.to) {
        dateQuery.createdAt['$lte'] = new Date(filter.createdDate.to);
      }
      applyFilter.push(dateQuery);
    }

    if (filter?.subscriptionEndDate) {
      const dateQuery = {
        currentPeriodEnds: {},
      };
      if (filter?.subscriptionEndDate.from) {
        dateQuery.currentPeriodEnds['$gte'] = Math.floor(
          new Date(filter.subscriptionEndDate.from).getTime() / 1000
        );
      }
      if (filter?.subscriptionEndDate.to) {
        dateQuery.currentPeriodEnds['$lte'] = Math.floor(
          new Date(filter.subscriptionEndDate.to).getTime() / 1000
        );
      }
      applyFilter.push(dateQuery);
    }

    if (applyFilter.length) {
      allFilter['$and'] = applyFilter;
    }

    const matchQuery = {
      $match: allFilter,
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

    let aggregatePipeline: any = [];

    if (searchValue.length) {
      const searchQuery = {
        $match: {
          name: { $regex: searchValue, $options: 'i' },
        },
      };

      aggregatePipeline = [...aggregatePipeline, searchQuery];
    }

    aggregatePipeline = [...aggregatePipeline, matchQuery, paginationQuery];

    const data = await SubscriptionPlan.aggregate(aggregatePipeline);
    return data;
  };

  public static deletePlan = async (planId: string) => {
    const data = SubscriptionPlan.findByIdAndDelete(planId);
    return data;
  };

  public static updatePlan = async (planId: string, update: any) => {
    const updateDocument = {
      name: update.name,
      description: update.description,
    };

    const updatePlan = {
      name: update.name,
      description: update.description,
    };

    if (update.image) {
      updatePlan['images'] = [update.image];
      updateDocument['image'] = update.image;
    }

    const planPromise = stripe.products.update(update.productId, updatePlan);

    const dataPromise = await SubscriptionPlan.findByIdAndUpdate(
      planId,
      updateDocument,
      {
        new: true,
      }
    );
    const [plan, data] = await Promise.all([planPromise, dataPromise]);
    return 'Updated Successfully!';
  };
}

const numberQuery = (filter: any, key: string) => {
  if (filter?.min && filter?.max) {
    const numberQuery = {
      [key]: {
        $gte: parseInt(filter.min),
        $lte: parseInt(filter.max),
      },
    };
    return numberQuery;
  }
};
