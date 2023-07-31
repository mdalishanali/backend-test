"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
// NPM Deps
var express = require("express");
// Internal Deps
var routes_1 = require("./routes");
var middleware_1 = require("../../services/middleware");
var middleware = new middleware_1.Middleware();
var OrderRouter = /** @class */ (function () {
    function OrderRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router.get('/', routes_1.OrderRoutes.get).post('/', routes_1.OrderRoutes.create);
        this.router
            .get('/:id', routes_1.OrderRoutes.getOne)
            .put('/:id', routes_1.OrderRoutes.update)
            .delete('/:id', routes_1.OrderRoutes.delete);
    }
    return OrderRouter;
}());
exports.OrderRouter = OrderRouter;
//# sourceMappingURL=index.js.map