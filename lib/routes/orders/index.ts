
// NPM Deps
import * as express from 'express';

// Internal Deps
import { OrderRoutes } from './routes';
import { Middleware } from '../../services/middleware';

const middleware = new Middleware();
export class OrderRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.use(middleware.requireLogin);
    this.router
      .get('/', OrderRoutes.get)
      .post('/', OrderRoutes.create)
    this.router
      .get('/:id', OrderRoutes.getOne)
      .put('/:id', OrderRoutes.update)
      .delete('/:id', OrderRoutes.delete);
  }
}
