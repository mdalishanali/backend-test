// NPM Deps
import * as express from 'express';
import { Middleware } from '../../services/middleware';

// Internal Deps
import { UtilsRoutes } from './routes';

const middleware = new Middleware();
export class UtilsRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.router.get('/collections', UtilsRoutes.findAllCollections);
    this.router.get('/sidebarItem', UtilsRoutes.findAllSidebarItems);

  }
}

