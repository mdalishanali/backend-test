import * as status from 'http-status';
import * as express from 'express';
import * as StandardError from 'standard-error';

import { InviteUsersHelpers } from './helpers';
import { AuthenticatedRequest } from '../../../interfaces/authenticated-request';

export class InviteUserRoutes {

  public static resendInvites = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const email: string = req.body.document.email;
      const userId = req.user._id;
      const data = await InviteUsersHelpers.resendInvitation(email, userId, req.protocol);
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  public static inviteUser = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const emails = req.body.document.emails.length > 0 ? req.body.document.emails : [];
      const userId = req.user._id;

      if (emails.length < 1) {
        throw new StandardError({
          message: 'At least one email is required',
          code: status.CONFLICT,
        });
      }

      const data = await InviteUsersHelpers.inviteUsers(emails, userId, req.protocol);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static getInvitedUser = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {

      const userId = req.user._id;
      const data = await InviteUsersHelpers.invitedUsers(userId);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static cancelInvite = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const inviteId = req.params.id;
      const userId = req.user._id;
      const data = await InviteUsersHelpers.cancelInvite(inviteId, userId);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static inviteSingleUser = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const inviteUser = req.body.document;
      const companyId = req.user.companyId;
      const userId = req.user._id;
      if (!inviteUser.email.length) {
        throw new StandardError({
          message: 'email is required',
          code: status.CONFLICT,
        });
      }

      const data = await InviteUsersHelpers.inviteSingleUser(inviteUser, companyId, userId, req.protocol);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static getAllInvitedUser = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const query = req.query;
      const user = req.user;
      const data = await InviteUsersHelpers.findAllInvitedUser(query,user);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

  public static updateInvite = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const inviteId = req.params.id;
      const permissions = req.body.permissions;
      const data = await InviteUsersHelpers.updateInvite(inviteId, permissions);
      res.locals.code = status.OK;
      res.locals.res_obj = { data };
      return next();
    } catch (error) {
      next(error);
    }
  }

}
