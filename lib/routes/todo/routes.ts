
    // NPM Dependencies
    import * as status from 'http-status';
    import * as express from 'express';

    // Internal Dependencies
    import { TodoHelpers } from './helpers';
    import { AuthenticatedRequest } from 'interfaces/authenticated-request';

    export class TodoRoutes {
    
    public static get = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const query = req.query;
    const user = req.user;
    const data = await TodoHelpers.findAll(query, user);
        
    res.locals.code = status.OK;
    res.locals.res_obj = {data}
    return next();
  } catch (error) {
    next(error);
  }
}
    public static getOne = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;
    
      const companyId = req.user.companyId
      const data = await TodoHelpers.findOne(id, companyId);
    res.locals.code = status.OK;
    res.locals.res_obj = { data };
    return next();
  } catch (error) {
    next(error);
  }
}
    public static update = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;
    const update = req.body.update;
    const doc = await TodoHelpers.findOne(id, req.user.companyId);
      TodoHelpers.authenticate(doc, req.user);
    const data = await TodoHelpers.findAndUpdate({ id, update });
    res.locals.code = status.OK;
    res.locals.res_obj = { data };
    return next();
  } catch (error) {
    next(error);
  }
}
    public static create = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const document = req.body.document;
     document.companyId = req.user.companyId;
    document.userId = req.user._id;
    const data = await TodoHelpers.create(document);
    res.locals.code = status.OK;
    res.locals.res_obj = { data };
    return next();
  } catch (error) {
    next(error);
  }
}
    public static delete = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;
    const user = req.user
    const doc = await TodoHelpers.findOne(id, user.companyId);
      TodoHelpers.authenticate(doc, user);
    const data = TodoHelpers.softDelete(id, user);
    res.locals.code = status.OK;
    res.locals.res_obj = { data };
    return next();
  } catch (error) {
    next(error);
  }
}
    }
    