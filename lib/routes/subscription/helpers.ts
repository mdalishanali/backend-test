// NPM Dependencies
import * as status from 'http-status';
import * as StandardError from 'standard-error';
import { config } from '../../config';
import { Subscription, SubscriptionPlan, User } from '../../db';

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

    const addFielduser = {
      $addFields: {
        user: { $arrayElemAt: ['$user', 0] },
      },
    };
    const addFieldSubscriptionPlan = {
      $addFields: {
        subscriptionPlan: { $arrayElemAt: ['$subscriptionPlan', 0] },
      },
    };

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

    let aggregatePipeline: any = [
      matchQuery,
      userLookupQuery,
      subscriptionPlanLookupQuery,
      addFielduser,
      addFieldSubscriptionPlan,
    ];

    if (searchValue.length) {
      const searchQuery = {
        $match: {
          $or: [
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

    const data = Subscription.aggregate(aggregatePipeline);
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

    const data = SubscriptionPlan.aggregate(aggregatePipeline);
    return data;
  };

  public static createPricing = async (document: any) => {
    const productParameter = {
      name: document.name,
      description: document.description,
      images: [document.productImage],
    };
    const product = await stripe.products.create(productParameter);

    const priceParameter = {
      unit_amount: document.price * 100,
      currency: 'usd',
      recurring: { interval: 'month' },
      product: product.id,
    };

    switch (document?.type) {
      case '3months':
        priceParameter.recurring['interval_count'] = 3;
        break;
      default:
        break;
    }

    const price = await stripe.prices.create(priceParameter);

    const subscriptionPlanDocument = {
      name: product.name,
      type:
        price.recurring.interval == 'month'
          ? 'MONTHLY'
          : price.recurring.interval,
      currency: price.currency,
      price: price.unit_amount / 100, // divide by 100 to convert cent into dollar
      description: product.description,
      productId: product.id,
      priceId: price.id,
    };

    const subscriptionPlan = await SubscriptionPlan.create(
      subscriptionPlanDocument
    );

    return { subscriptionPlan, price };
  };

  public static pricesList = async (productId: string) => {
    return stripe.prices.list({
      limit: 20,
      product: productId,
      expand: ['data.product'],
    });
  };
  public static createSubscriptionSession = async (user, priceId) => {
    let customer;
    if (user.stripeCustomerId) {
      customer = user.stripeCustomerId;
    } else {
      const newCustomer = await stripe.customers.create({
        name: user.fullName,
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      });
      await User.updateOne(
        { _id: user._id },
        { stripeCustomerId: newCustomer.id },
        { new: true }
      );
      customer = newCustomer.id;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `http://${config.HOST}/payment/success`,
      cancel_url: `http://${config.HOST}/`,
      customer: customer,
    });
    return session;
  };

  public static handleStripeWebhookEvents = async (req, res, next) => {
    const event = req.body;
    try {
      res.sendStatus(200);
      setImmediate(async () => {
        try {
          switch (event.type) {
            case 'payment_intent.succeeded':
              const paymentIntent = event.data.object;
              if (paymentIntent.status === 'succeeded') {
              }
              break;
            case 'payment_intent.payment_failed':
              const failedPaymentIntent = event.data.object;
              if (failedPaymentIntent.status === 'requires_payment_method') {
                // The payment failed and requires a new payment method
              } else if (failedPaymentIntent.status === 'canceled') {
                // set the status to false
              }
              break;
            case 'customer.subscription.updated':
              const subscriptionSuccess = event.data.object;
              const user = await User.findOne({
                stripeCustomerId: subscriptionSuccess.customer,
              });
              const plan = await stripe.plans.retrieve(
                subscriptionSuccess.plan.id,
                { expand: ['product'] }
              );

              const isSubscriptionPlanPresent = await SubscriptionPlan.findOne({
                priceId: plan.id,
              });

              let subscriptionPlan;

              if (isSubscriptionPlanPresent) {
                subscriptionPlan = isSubscriptionPlanPresent;
              } else {
                const subscriptionPlanDocument = {
                  name: plan.product.name,
                  type: plan.interval == 'month' ? 'MONTHLY' : plan.interval,
                  currency: plan.currency,
                  price: plan.amount / 100, // divide by 100 to convert cent into dollar
                  description: plan.product.description,
                  productId: plan.product.id,
                  priceId: plan.id,
                };

                subscriptionPlan = await SubscriptionPlan.create(
                  subscriptionPlanDocument
                );
              }

              const subscriptionDocument = {
                userRef: user._id,
                currentPeriodStarts: subscriptionSuccess.current_period_start,
                currentPeriodEnds: subscriptionSuccess.current_period_end,
                subscriptionId: subscriptionSuccess.id,
                status: subscriptionSuccess.status,
                planId: subscriptionSuccess.plan.id,
                subscriptionPlanRef: subscriptionPlan._id,
              };
              const subscribedDocument =
                await SubscriptionHelpers.createSubscription(
                  subscriptionDocument
                );

              await User.updateOne(
                { stripeCustomerId: subscriptionSuccess.customer },
                {
                  subscriptionRef: subscribedDocument._id,
                  subscriptionStatus: subscriptionSuccess.status,
                },
                { new: true }
              );

              break;
            case 'customer.subscription.deleted':
              // Handle subscription deletion
              const subscription = event.data.object;
              // const { status, current_period_end } = subscription;
              // if (status === 'canceled') {
              //   const user = await StripeHelpers.updateSubscriptionCancellationRequested(subscription.customer, current_period_end);
              // }
              break;
            default:
              // Handle other event types if necessary
              break;
          }
        } catch (error) {
          console.log('error: ', error);
          next(error);
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public static createSubscription = async (document) => {
    return Subscription.create(document);
  };

  public static deleteProductPlan = async (document) => {
    return await Subscription.create(document);
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
