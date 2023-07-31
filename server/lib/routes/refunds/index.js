"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var RefundRouter = /** @class */ (function () {
    function RefundRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router.get('/', routes_1.RefundRoutes.getAllPayments);
        this.router.post('/', routes_1.RefundRoutes.create);
    }
    return RefundRouter;
}());
exports.RefundRouter = RefundRouter;
//# sourceMappingURL=index.js.map