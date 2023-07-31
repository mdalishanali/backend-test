"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var middleware_1 = require("../../../services/middleware");
var middleware = new middleware_1.Middleware();
var SubscriptionRouter = /** @class */ (function () {
    function SubscriptionRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router.get('/', routes_1.SubscriptionRoutes.get);
        this.router.get('/plan/:id', routes_1.SubscriptionRoutes.getAllPlans);
        this.router.get('/plan', routes_1.SubscriptionRoutes.getAllPlans);
        this.router.delete('/plan/:planId', routes_1.SubscriptionRoutes.deleteSubscription);
        this.router.put('/plan/:planId', routes_1.SubscriptionRoutes.updateSubscription);
    }
    return SubscriptionRouter;
}());
exports.SubscriptionRouter = SubscriptionRouter;
//# sourceMappingURL=index.js.map