// NPM Dependencies
import * as status from 'http-status';
import * as express from 'express';

import { config } from "../../config";

const stripe = require("stripe")(config.STRIPE_SECRET_KEY);

// Internal Dependencies
import { OrdersHelpers } from './helpers';
import { AuthenticatedRequest } from 'interfaces/authenticated-request';

export class OrderRoutes {

  public static get = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const query = req.query;
      const user = req.user;
      const data = await OrdersHelpers.findAll(query, user);
      res.locals.code = status.OK;
      res.locals.res_obj = { data }
      return next();
    } catch (error) {
      next(error);
    }
  }
  public static getOne = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const id = req.params.id;

      const companyId = req.user.companyId
      const data = await OrdersHelpers.findOne(id, companyId);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  }
  public static update = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const id = req.params.id;
      const update = req.body.update;
      const doc = await OrdersHelpers.findOne(id, req.user.companyId);
      OrdersHelpers.authenticate(doc, req.user);
      const data = await OrdersHelpers.findAndUpdate({ id, update });
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }
  public static create = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const user = req.user;
      const { payment_intent, productId } = req.body.document;
      const intent = await stripe.paymentIntents.retrieve(payment_intent);
      const chargeId = intent?.latest_charge;
      const charge = await stripe.charges.retrieve(
        chargeId
      );
      const { payment_method_details, id, status } = charge

      const document = {
        chargeId: id,
        userId: user._id,
        productId: productId,
        paymentStatus: status,
        paymentMethodDetails: payment_method_details
      }
      const data = await OrdersHelpers.create(document);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  }
  public static delete = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const id = req.params.id;
      const user = req.user
      const doc = await OrdersHelpers.findOne(id, user.companyId);
      OrdersHelpers.authenticate(doc, user);
      const data = OrdersHelpers.softDelete(id, user);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }
}
