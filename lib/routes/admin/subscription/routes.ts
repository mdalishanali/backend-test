import * as express from 'express';
import * as status from 'http-status';
import { AuthenticatedRequest } from '../../../interfaces/authenticated-request';
import { SubscriptionHelpers } from './helpers';

export class SubscriptionRoutes {
  public static get = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const user = req.user;
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
  public static deleteSubscription = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { planId } = req.params;
      const data = await SubscriptionHelpers.deletePlan(planId);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  };
  public static updateSubscription = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { planId } = req.params;
      const update = req.body.update;
      const data = await SubscriptionHelpers.updatePlan(planId, update);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      console.log('error: ', error);
      next(error);
    }
  };
}
