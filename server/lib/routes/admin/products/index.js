"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var ProductsRouter = /** @class */ (function () {
    function ProductsRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router
            .get('/', routes_1.ProductsRoutes.get)
            .post('/', routes_1.ProductsRoutes.create);
        this.router
            .get('/:id', routes_1.ProductsRoutes.getOne)
            .put('/:id', routes_1.ProductsRoutes.update)
            .delete('/:id', routes_1.ProductsRoutes.delete);
    }
    return ProductsRouter;
}());
exports.ProductsRouter = ProductsRouter;
//# sourceMappingURL=index.js.map