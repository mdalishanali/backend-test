"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentErrorHandlerService = void 0;
var StandardError = require("standard-error");
var email_1 = require("./../../services/email");
var PaymentErrorHandlerService = /** @class */ (function () {
    function PaymentErrorHandlerService() {
    }
    PaymentErrorHandlerService.PaymentErrorHandleError = function (error, next, userEmail) {
        var email = new email_1.EmailService();
        switch (error.type) {
            case 'StripeCardError':
                // A declined card error
                next(new StandardError({ message: error.message, code: error.statusCode })); // => e.g. "Your card's expiration year is invalid."
                break;
            case 'RateLimitError':
                // Too many requests made to the API too quickly
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
            case 'StripeInvalidRequestError':
                // Invalid parameters were supplied to Stripe's API
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
            case 'StripeAPIError':
                // An error occurred internally with Stripe's API
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
            case 'StripeConnectionError':
                // Some kind of error occurred during the HTTPS communication
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
            case 'StripeAuthenticationError':
                // You probably used an incorrect API key.
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
            default:
                // Handle any other types of unexpected errors
                next(new StandardError({ message: error.message, code: error.statusCode }));
                break;
        }
    };
    return PaymentErrorHandlerService;
}());
exports.PaymentErrorHandlerService = PaymentErrorHandlerService;
//# sourceMappingURL=payment-error-handler.js.map