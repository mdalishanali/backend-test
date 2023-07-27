import * as express from 'express';
import { SubscriptionRoutes } from './routes';

import { Middleware } from '../../services/middleware';
const middleware = new Middleware();

export class StripeSubscriptionRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.get('/', middleware.requireLogin, SubscriptionRoutes.get);
    this.router.get(
      '/plan',
      middleware.requireLogin,
      SubscriptionRoutes.getAllPlans
    );

    this.router.post(
      '/create/pricing',
      middleware.requireAdmin,
      SubscriptionRoutes.createProductPricing
    );
    this.router.get(
      '/prices/:id',
      middleware.requireLogin,
      SubscriptionRoutes.getPricingList
    );
    this.router.post(
      '/session',
      middleware.requireLogin,
      SubscriptionRoutes.createSubscriptionSession
    );
    this.router.post('/webhook', SubscriptionRoutes.webhook);
    this.router.delete('/plan/:id', SubscriptionRoutes.webhook);
  }
}
