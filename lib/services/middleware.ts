import * as status from 'http-status';
import * as StandardError from 'standard-error';
import * as jwt from 'jwt-simple';
import { InvitedUsers, User } from '../db';
//import config
import { config } from '../config';

export class Middleware {
  JWT_SECRET: string;
  constructor() {
    this.JWT_SECRET = config.JWT_SECRET || 'i am a tea pot';
  }

  public requireLogin = async (req, res, next) => {
    if (!req.user) {
      throw new StandardError({
        message: 'Login Required',
        code: status.UNAUTHORIZED,
      });
    }

    // if (req?.user?.roles === 'Moderator') {
    //   const url = req.originalUrl;
    //   const hitCollectionName = url.match(/\/api\/([^?]+)/)?.[1];

    //   const invitedUser = await InvitedUsers.findOne({
    //     invitedEmail: req?.user?.email,
    //   })

    //   const userPermission = invitedUser.permissions.filter(
    //     (item) => item.access
    //   ).map((item) => item.collectionName);
    //   const hasAccess = userPermission.includes(hitCollectionName + "s")

    //   if (!hasAccess) {
    //     throw new StandardError({
    //       message: 'You do not have access',
    //       code: status.UNAUTHORIZED
    //     });
    //   }
    // }

    next();
  };

  public jwtDecoder = async (req, res, next) => {
    try {
      const authz = req.headers.authorization;
      if (!authz) {
        return next();
      }

      const decoded = jwt.decode(authz, this.JWT_SECRET);

      if (!decoded || !decoded.valid) {
        throw new StandardError({
          message: 'Invalid Token',
          code: status.BAD_REQUEST,
        });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        throw new StandardError({
          message: 'Invalid Token',
          code: status.BAD_REQUEST,
        });
      }

      req.user = user;
      req.token = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };

  public requireSuperAdmin = (req, res, next) => {
    if (!req.user) {
      throw new StandardError({
        message: 'Super Admin authorization required',
        code: status.FORBIDDEN,
      });
    }

    if (!req.user.isSuperAdmin) {
      throw new StandardError({
        message: 'Super Admin authorization required',
        code: status.FORBIDDEN,
      });
    }
    next();
  };

  public requireAdmin = (req, res, next) => {
    if (!req.user) {
      throw new StandardError({
        message: 'Admin authorization required',
        code: status.FORBIDDEN,
      });
    }
    if (!req.user.isAdmin) {
      throw new StandardError({
        message: 'Admin authorization required',
        code: status.FORBIDDEN,
      });
    }
    next();
  };
  public requireAdminOrModerator = (req, res, next) => {
    if (!req.user) {
      throw new StandardError({
        message: 'Admin authorization required',
        code: status.FORBIDDEN,
      });
    } else if (req.user.roles === 'User') {
      throw new StandardError({
        message: 'Admin authorization required',
        code: status.FORBIDDEN,
      });
    } else if (
      req.user.roles === 'Super Admin' ||
      req.user.roles === 'Moderator' ||
      req.user.roles === 'Admin'
    )
      // {
      //   next();
      // }
      next();
  };
}
