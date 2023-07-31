"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePaymentRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var StripePaymentRouter = /** @class */ (function () {
    function StripePaymentRouter() {
        this.router = express.Router();
        this.router.get('/charges', routes_1.StripePaymentRoutes.getAllCharges);
        this.router.get('/sellers', routes_1.StripePaymentRoutes.getAllSellers);
        this.router.get('/payouts', routes_1.StripePaymentRoutes.getAllPayouts);
        this.router.post('/create/payout', routes_1.StripePaymentRoutes.createPayout);
        this.router.get('/seller/charges/:sellerStripeAccountId', routes_1.StripePaymentRoutes.getSellerChargesWithBalance);
    }
    return StripePaymentRouter;
}());
exports.StripePaymentRouter = StripePaymentRouter;
//# sourceMappingURL=index.js.map