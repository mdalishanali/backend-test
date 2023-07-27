import * as status from 'http-status';
import * as express from 'express';
import { ReferralHelpers } from './helpers';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request';

export class ReferralRoutes {
  public static getAllReferrals = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const data = await ReferralHelpers.findAll(query);
      res.locals.code = status.OK;
      res.locals.res_obj = { data: { data } };
      return next();
    } catch (error) {
      next(error);
    }
  };
}
