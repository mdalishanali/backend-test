"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminRouter = void 0;
var express = require("express");
var middleware_1 = require("../../services/middleware");
var stripePayment_1 = require("./stripePayment");
var products_1 = require("./products");
var referrals_1 = require("./referrals");
var middleware = new middleware_1.Middleware();
var SuperAdminRouter = /** @class */ (function () {
    function SuperAdminRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireSuperAdmin);
        this.router.use('/stripe', new stripePayment_1.StripePaymentRouter().router);
        this.router.use('/products', new products_1.SuperAdminProductsRouter().router);
        this.router.use('/referrals', new referrals_1.SuperAdminReferralsRouter().router);
    }
    return SuperAdminRouter;
}());
exports.SuperAdminRouter = SuperAdminRouter;
//# sourceMappingURL=index.js.map