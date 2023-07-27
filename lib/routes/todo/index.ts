
    // NPM Deps
    import * as express from 'express';
    import { Middleware } from '../../services/middleware';

    // Internal Deps
    import { TodoRoutes } from './routes';

    const middleware = new Middleware();
    export class TodoRouter {
      router: express.Router;
      constructor() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router
          .get('/', TodoRoutes.get)
          .post('/', TodoRoutes.create)
        this.router
          .get('/:id', TodoRoutes.getOne)
          .put('/:id', TodoRoutes.update)
          .delete('/:id', TodoRoutes.delete);
      }
    }
    