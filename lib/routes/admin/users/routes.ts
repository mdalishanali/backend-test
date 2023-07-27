// NPM Dependencies
import * as status from 'http-status';
import * as express from 'express';

// Internal Dependencies
import { AdminUsersHelpers } from './helpers';
import { AuthenticatedRequest } from 'interfaces/authenticated-request';

export class AdminUsersRoutes {
  public static get = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const data = await AdminUsersHelpers.findAll(query);
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
      const { id }: { id: string } = req.params;
      const allUsers = await AdminUsersHelpers.findOne(id);
      res.locals.code = status.OK;
      res.locals.res_obj = allUsers;
      return next();
    } catch (error) {
      next(error);
    }
  }
}
