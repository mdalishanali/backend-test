"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var SubscriptionsRouter = /** @class */ (function () {
    function SubscriptionsRouter() {
        this.router = express.Router();
        this.router.post('/', routes_1.SubscriptionsRoutes.processStripeSubscriptionWebhook);
    }
    return SubscriptionsRouter;
}());
exports.SubscriptionsRouter = SubscriptionsRouter;
//# sourceMappingURL=index.js.map