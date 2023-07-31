"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var PaymentRouter = /** @class */ (function () {
    function PaymentRouter() {
        this.router = express.Router();
        this.router.get('/', routes_1.PaymentRoutes.getPayments);
        this.router.get('/getPaymentDetails/:id', routes_1.PaymentRoutes.getPaymentsById);
        this.router.get('/getUserCardDetails/:userId', routes_1.PaymentRoutes.getUserCardDetails);
        this.router.post('/change/savedcard', routes_1.PaymentRoutes.changeSavedCard);
        this.router.post('/charge/create', routes_1.PaymentRoutes.createCharge);
        this.router.post('/charge/savedCard', routes_1.PaymentRoutes.chargeSavedCard);
        this.router.get('/getSavedCard', routes_1.PaymentRoutes.retrieveSavedCard);
        this.router.post('/charge/guestCard', routes_1.PaymentRoutes.chargeGuestCard);
        this.router.post('/savePayPalPayment', routes_1.PaymentRoutes.savePayPalPayment);
        this.router.post('/saveCard', routes_1.PaymentRoutes.saveCard);
        this.router.post('/deleteCard', routes_1.PaymentRoutes.deleteCard);
        this.router.put('/updateCard', routes_1.PaymentRoutes.updateCard);
        this.router.post('/subscription/create', routes_1.PaymentRoutes.createSubscriptionCharge);
        this.router.put('/subscription/cancelRenewal', routes_1.PaymentRoutes.cancelRenewal);
        this.router.post('/create/intent', routes_1.PaymentRoutes.createPaymentIntent);
    }
    return PaymentRouter;
}());
exports.PaymentRouter = PaymentRouter;
//# sourceMappingURL=index.js.map