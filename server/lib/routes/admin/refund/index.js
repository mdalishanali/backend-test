"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var RefundsRouter = /** @class */ (function () {
    function RefundsRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router.get('/', routes_1.RefundsRoutes.get).post('/', routes_1.RefundsRoutes.initiateRefund);
        this.router
            .get('/:id', routes_1.RefundsRoutes.getOne)
            .put('/:id', routes_1.RefundsRoutes.update)
            .delete('/:id', routes_1.RefundsRoutes.delete);
    }
    return RefundsRouter;
}());
exports.RefundsRouter = RefundsRouter;
//# sourceMappingURL=index.js.map