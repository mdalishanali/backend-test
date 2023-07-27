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
    this.router.post('/invite', middleware.requireAdmin, InviteUserRoutes.inviteUser);
    this.router.post('/resend-invite', middleware.requireAdmin, InviteUserRoutes.resendInvites);
    this.router.get('/invited-users', middleware.requireAdmin, InviteUserRoutes.getInvitedUser);
    this.router.get('/cancelInvite/:id', middleware.requireAdmin, InviteUserRoutes.cancelInvite);
    this.router.post('/invite/single-user', middleware.requireAdminOrModerator, InviteUserRoutes.inviteSingleUser);
    this.router.get('/all-invited-users', middleware.requireAdmin, InviteUserRoutes.getAllInvitedUser);
    this.router.put('/updateInvite/:id', InviteUserRoutes.updateInvite);
  }
}
