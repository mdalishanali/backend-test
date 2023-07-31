"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
var express = require("express");
var todo_1 = require("./todo");
var users_1 = require("./users");
var inviteUser_1 = require("./inviteUser");
var payments_1 = require("./payments");
var refund_1 = require("./refund");
var company_1 = require("./company");
var products_1 = require("./products");
var subscription_1 = require("./subscription");
var AdminRouter = /** @class */ (function () {
    function AdminRouter() {
        this.router = express.Router();
        this.router.use('/todo', new todo_1.TodoRouter().router);
        this.router.use('/user', new users_1.AdminUsersRouter().router);
        this.router.use('/inviteUser', new inviteUser_1.InviteUserRouter().router);
        this.router.use('/payments', new payments_1.PaymentRouter().router);
        this.router.use('/refunds', new refund_1.RefundsRouter().router);
        this.router.use('/company', new company_1.CompanyRouter().router);
        this.router.use('/products', new products_1.ProductsRouter().router);
        this.router.use('/subscription', new subscription_1.SubscriptionRouter().router);
    }
    return AdminRouter;
}());
exports.AdminRouter = AdminRouter;
//# sourceMappingURL=admin.js.map