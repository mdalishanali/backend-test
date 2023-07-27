import * as express from 'express';
import { SubscriptionRoutes } from './routes';

import { Middleware } from '../../../services/middleware';
const middleware = new Middleware();

export class SubscriptionRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.use(middleware.requireAdmin);
    this.router.get('/', SubscriptionRoutes.get);
    this.router.get('/plan/:id', SubscriptionRoutes.getAllPlans);
    this.router.get('/plan', SubscriptionRoutes.getAllPlans);
    this.router.delete('/plan/:planId', SubscriptionRoutes.deleteSubscription);
    this.router.put('/plan/:planId', SubscriptionRoutes.updateSubscription);
  }
}
