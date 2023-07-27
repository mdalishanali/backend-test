import * as express from 'express';
import * as status from 'http-status';
      import { TodoRouter } from './todo';
import { AdminUsersRouter } from './users';
import { InviteUserRouter } from './inviteUser';
import { PaymentRouter } from './payments';
import { RefundsRouter } from './refund';
import { CompanyRouter } from './company';
import { ProductsRouter } from './products';
import { SubscriptionRouter } from './subscription';
export class AdminRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
      this.router.use('/todo', new TodoRouter().router);
    this.router.use('/user', new AdminUsersRouter().router);
    this.router.use('/inviteUser', new InviteUserRouter().router);
    this.router.use('/payments', new PaymentRouter().router);
    this.router.use('/refunds', new RefundsRouter().router);
    this.router.use('/company', new CompanyRouter().router);
    this.router.use('/products', new ProductsRouter().router);
    this.router.use('/subscription', new SubscriptionRouter().router);
  }
}
