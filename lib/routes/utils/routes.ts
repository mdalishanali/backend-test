import * as status from 'http-status';
import * as express from 'express';
import * as StandardError from 'standard-error';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { config } from '../../config';
import { UtilsHelpers } from './helpers';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request';
import * as mongoose from 'mongoose';
import { InvitedUsers, User, Company } from '../../db';

const JWT_SECRET: string = config.JWT_SECRET || 'i am a tea pot';

export class UtilsRoutes {

  public static findAllCollections = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const collections = mongoose.connections[0].collections;
      let names = [];
      Object.keys(collections).forEach(function (name) {
        names.push(name);
      });
      let removeThese = ["users", "payments", "reviews", "invitedusers", "refunds", "companies", "fcmtokens",
      ];
      names = names.filter((val) => !removeThese.includes(val));
      res.locals.code = status.OK;
      res.locals.res_obj = { names }
      return next();
    } catch (error) {
      next(error);
    }

  }

  public static findAllSidebarItems = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = req.user;
      const data = await UtilsHelpers.findSidebarItems(user.email)
      res.locals.code = status.OK;
      res.locals.res_obj = { data }
      return next();
    } catch (error) {
      next(error);
    }

  }
}
