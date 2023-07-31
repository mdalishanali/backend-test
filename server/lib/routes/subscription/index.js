"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeSubscriptionRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var middleware_1 = require("../../services/middleware");
var middleware = new middleware_1.Middleware();
var StripeSubscriptionRouter = /** @class */ (function () {
    function StripeSubscriptionRouter() {
        this.router = express.Router();
        this.router.get('/', middleware.requireLogin, routes_1.SubscriptionRoutes.get);
        this.router.get('/plan', middleware.requireLogin, routes_1.SubscriptionRoutes.getAllPlans);
        this.router.post('/create/pricing', middleware.requireAdmin, routes_1.SubscriptionRoutes.createProductPricing);
        this.router.get('/prices/:id', middleware.requireLogin, routes_1.SubscriptionRoutes.getPricingList);
        this.router.post('/session', middleware.requireLogin, routes_1.SubscriptionRoutes.createSubscriptionSession);
        this.router.post('/webhook', routes_1.SubscriptionRoutes.webhook);
        this.router.delete('/plan/:id', routes_1.SubscriptionRoutes.webhook);
    }
    return StripeSubscriptionRouter;
}());
exports.StripeSubscriptionRouter = StripeSubscriptionRouter;
//# sourceMappingURL=index.js.map