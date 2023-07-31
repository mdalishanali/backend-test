"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksRouter = void 0;
var express = require("express");
var subscriptions_1 = require("./subscriptions");
var WebhooksRouter = /** @class */ (function () {
    function WebhooksRouter() {
        this.router = express.Router();
        this.router.use('/subscriptions', new subscriptions_1.SubscriptionsRouter().router);
    }
    return WebhooksRouter;
}());
exports.WebhooksRouter = WebhooksRouter;
//# sourceMappingURL=index.js.map