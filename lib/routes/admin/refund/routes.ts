// NPM Dependencies
import * as status from 'http-status';
import * as express from 'express';

// Internal Dependencies
import { RefundHelpers } from './helpers';
import { AuthenticatedRequest } from 'interfaces/authenticated-request';
import { config } from '../../../config';
import { OrdersHelpers } from '../../orders/helpers';

const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

export class RefundsRoutes {
  public static get = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const data = await RefundHelpers.findAll(query);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static getOne = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await RefundHelpers.findOne(id);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }


  public static update = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = req.params.id;
      const update = req.body.update;
      const data = await RefundHelpers.findAndUpdate({ id, update });
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static initiateRefund = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const document = req.body.document;
      const { amount, chargeId, reason, orderId, refundId } = document;
      const refundItem = await RefundHelpers.findOne(refundId);

      const refund = await stripe.refunds.create(
        {
          charge: chargeId,
          reason: reason,
          reverse_transfer: true,
          amount: amount * 100
        },
        {
          stripeAccount: config.STRIPE_ACCOUNT_ID,
        }
      );

      const charge = await stripe.charges.retrieve(
        chargeId
      );

      const { refunded, amount_refunded } = charge;
      let refundStatus = 'partial-refunded'
      if (refunded) {
        refundStatus = 'fully-refunded'
      } else if (amount_refunded > 0) {
        refundStatus = 'partially-refunded'
      }


      const updatedRefundPromise = RefundHelpers.findAndUpdate({ id: refundId, update: { status: refundStatus, refundedAmount: amount_refunded / 100 } });

      const updatedOrderPromise = OrdersHelpers.findAndUpdate({ id: orderId, update: { paymentStatus: refundStatus } });

      const [updatedRefund, updatedOrder] = await Promise.all([updatedRefundPromise, updatedOrderPromise])

      res.locals.code = status.OK;
      res.locals.res_obj = { charge, refund: updatedRefund, order: updatedOrder, stripeRefund: refund };
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public static create = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const document = req.body.document;
      const data = await RefundHelpers.create(document);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static delete = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const id = req.params.id;
      RefundHelpers.softDelete(id);
      res.locals.code = status.OK;
      res.locals.res_obj = {};
      return next();
    } catch (error) {
      next(error);
    }
  }
}
