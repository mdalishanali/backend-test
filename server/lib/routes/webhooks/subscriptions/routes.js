"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsRoutes = void 0;
var stripe_1 = require("stripe");
var config_1 = require("./../../../config");
var index_1 = require("../../../db/index");
var stripe_service_1 = require("../../../services/stripe-service");
var email_1 = require("../../../services/email");
var user_helper_1 = require("lib/routes/payment/helpers/user.helper");
var SubscriptionsRoutes = /** @class */ (function () {
    function SubscriptionsRoutes() {
        this.stripe = new stripe_1.default(config_1.config.STRIPE_SECRET_KEY, {
            apiVersion: "2020-08-27",
        });
    }
    SubscriptionsRoutes.processStripeSubscriptionWebhook = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var event_1, userHelpers, err_1, dataObject, userEmail, client, email, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        userHelpers = user_helper_1.UsersHelpers;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, stripe_service_1.stripeService.constructEvent(req.body, req.headers['stripe-signature'])];
                    case 2:
                        event_1 = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        console.log(err_1);
                        console.log("\u26A0\uFE0F  Webhook signature verification failed.");
                        console.log("\u26A0\uFE0F  Check the env file and enter the correct webhook secret.");
                        return [2 /*return*/, res.sendStatus(400)];
                    case 4:
                        dataObject = event_1.data.object;
                        userEmail = void 0, client = void 0, email = void 0;
                        _a = event_1.type;
                        switch (_a) {
                            case 'invoice.payment_succeeded': return [3 /*break*/, 5];
                            case 'invoice.payment_failed': return [3 /*break*/, 8];
                            case 'customer.subscription.deleted': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 11];
                    case 5:
                        userEmail = dataObject.customer_email;
                        return [4 /*yield*/, index_1.User.findOne({ email: userEmail }).lean()];
                    case 6:
                        client = _b.sent();
                        return [4 /*yield*/, stripe_service_1.stripeService.createSubscriptionPayment({ loggerInUserDetails: client, sub: {
                                    customer: dataObject.customer,
                                    id: dataObject.subscription,
                                } })];
                    case 7:
                        _b.sent();
                        email = new email_1.EmailService();
                        user_helper_1.UsersHelpers.renewSubscription({ 'id': client._id, 'endDate': dataObject.lines.data[0].period.end });
                        email.subscriptionRenewalSuccessEmail(client);
                        // Used to provision services after the trial has ended.
                        // The status of the invoice will show up as paid. Store the status in your
                        // database to reference when a user accesses your service to avoid hitting rate limits.
                        return [3 /*break*/, 11];
                    case 8:
                        userEmail = dataObject.customer_email;
                        return [4 /*yield*/, index_1.User.findOne({ email: userEmail }).lean()];
                    case 9:
                        client = _b.sent();
                        email = new email_1.EmailService();
                        email.subscriptionRenewalFailedEmail(client);
                        // If the payment fails or the customer does not have a valid payment method,
                        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
                        // Use this webhook to notify your user that their payment has
                        // failed and to retrieve new card details.
                        return [3 /*break*/, 11];
                    case 10:
                        if (event_1.request != null) {
                            // handle a subscription cancelled by your request
                            // from above.
                        }
                        else {
                            // handle subscription cancelled automatically based
                            // upon your subscription settings.
                        }
                        return [3 /*break*/, 11];
                    case 11:
                        res.sendStatus(200);
                        return [3 /*break*/, 13];
                    case 12:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    return SubscriptionsRoutes;
}());
exports.SubscriptionsRoutes = SubscriptionsRoutes;
//# sourceMappingURL=routes.js.map