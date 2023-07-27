import * as express from 'express';
import { Middleware } from '../../services/middleware';
import { StripePaymentRouter } from './stripePayment';
import { SuperAdminProductsRouter } from './products';
import { SuperAdminReferralsRouter } from './referrals';

const middleware = new Middleware();
export class SuperAdminRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.use(middleware.requireSuperAdmin);
    this.router.use('/stripe', new StripePaymentRouter().router);
    this.router.use('/products', new SuperAdminProductsRouter().router);
    this.router.use('/referrals', new SuperAdminReferralsRouter().router);
  }
}
