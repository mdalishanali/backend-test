"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var PaymentRouter = /** @class */ (function () {
    function PaymentRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router.get('/', routes_1.PaymentRoutes.getAllPayments);
        this.router.get('/chargesWithBalance', routes_1.PaymentRoutes.getAllCharges);
        this.router.get('/payoutsWithBalance', routes_1.PaymentRoutes.getAllPayouts);
        this.router.post('/refund/create', routes_1.PaymentRoutes.createRefundForCharge);
        this.router.post('/create/payout', routes_1.PaymentRoutes.createPayout);
    }
    return PaymentRouter;
}());
exports.PaymentRouter = PaymentRouter;
//# sourceMappingURL=index.js.map