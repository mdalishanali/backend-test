// NPM Deps
import * as express from 'express';
import { Middleware } from '../../../services/middleware';

// Internal Deps
import { InviteUserRoutes } from './routes';

const middleware = new Middleware();
export class InviteUserRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router
      .post('/invite', middleware.requireAdmin, InviteUserRoutes.inviteUser)
      .post(
        '/resend-invite',
        middleware.requireAdmin,
        InviteUserRoutes.resendInvites
      )
      .get(
        '/invited-users',
        middleware.requireAdmin,
        InviteUserRoutes.getInvitedUser
      )
      .get(
        '/cancelInvite/:id',
        middleware.requireAdmin,
        InviteUserRoutes.cancelInvite
      )
      .post(
        '/invite/single-user',
        middleware.requireAdminOrModerator,
        InviteUserRoutes.inviteSingleUser
      )
      .get(
        '/all-invited-users',
        middleware.requireAdmin,
        InviteUserRoutes.getAllInvitedUser
      )
      .put('/updateInvite/:id', InviteUserRoutes.updateInvite);
  }
}
