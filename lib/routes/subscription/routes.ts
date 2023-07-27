import * as express from 'express';
import * as status from 'http-status';
import { User, Payment, Products } from './../../db/index';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request';
import { config } from '../../config';
import { SubscriptionHelpers } from './helpers';
import { PaymentErrorHandlerService } from '../payment/payment-error-handler';

export class SubscriptionRoutes {
  public static get = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const data = await SubscriptionHelpers.findAll(query);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  };

  public static getAllPlans = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const user = req.user;
      const data = await SubscriptionHelpers.findAllPlans(query);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  };

  public static getPricingList = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const productId = req.params.id;
    try {
      const prices = await SubscriptionHelpers.pricesList(productId);
      res.locals.code = status.OK;
      res.locals.res_obj = prices;
      return next();
    } catch (error) {
      PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
    }
  };

  public static createProductPricing = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const document = req.body.document;
      const pricingPlan = await SubscriptionHelpers.createPricing(document);
      res.locals.code = status.OK;
      res.locals.res_obj = pricingPlan;
      return next();
    } catch (error) {
      PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
    }
  };

  public static createSubscriptionSession = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = req.user;
      const { priceId } = req.body;
      const session = await SubscriptionHelpers.createSubscriptionSession(
        user,
        priceId
      );
      res.locals.res_obj = session;
      res.locals.code = status.OK;
      return next();
    } catch (error) {
      PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
    }
  };

  public static webhook = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await SubscriptionHelpers.handleStripeWebhookEvents(req, res, next);
    } catch (error) {
      PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
    }
  };

  public static deletePlan = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await SubscriptionHelpers.handleStripeWebhookEvents(req, res, next);
    } catch (error) {
      PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
    }
  };
}
