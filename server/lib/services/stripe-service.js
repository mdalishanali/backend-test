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
exports.stripeService = void 0;
var config_1 = require("./../config");
var index_1 = require("./../db/index");
var stripe_1 = require("stripe");
var constants_1 = require("../../shared/constants/constants");
var StripeService = /** @class */ (function () {
    function StripeService() {
        var _this = this;
        this.createCustomer = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData;
            return __awaiter(_this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.create({
                                metadata: {
                                    Id: loggerInUserDetails.id,
                                    UserName: "" + loggerInUserDetails.fullName,
                                },
                                source: chargeData.token.id,
                                email: loggerInUserDetails.email
                            })];
                        case 1:
                            customer = _b.sent();
                            return [2 /*return*/, customer];
                    }
                });
            });
        };
        this.createChargeWithSavedCard = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData;
            return __awaiter(_this, void 0, void 0, function () {
                var charge;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.charges.create({
                                amount: chargeData.amount,
                                currency: chargeData.currency,
                                customer: loggerInUserDetails.stripeCustomerId,
                                source: chargeData.source
                            })];
                        case 1:
                            charge = _b.sent();
                            return [2 /*return*/, charge];
                    }
                });
            });
        };
        this.createChargeWithOutSavedCard = function (chargeData) { return __awaiter(_this, void 0, void 0, function () {
            var charge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.charges.create({
                            amount: chargeData.amount,
                            currency: chargeData.currency,
                            source: chargeData.token.id
                        })];
                    case 1:
                        charge = _a.sent();
                        return [2 /*return*/, charge];
                }
            });
        }); };
        this.createChargeWithSource = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData, source = _a.source;
            return __awaiter(_this, void 0, void 0, function () {
                var charge;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.charges.create({
                                amount: chargeData.amount,
                                currency: chargeData.currency,
                                customer: loggerInUserDetails.stripeCustomerId,
                                source: source.id
                            })];
                        case 1:
                            charge = _b.sent();
                            return [2 /*return*/, charge];
                    }
                });
            });
        };
        this.createSource = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData;
            return __awaiter(_this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.createSource(loggerInUserDetails.stripeCustomerId, {
                                source: chargeData.token.id
                            })];
                        case 1:
                            customer = _b.sent();
                            return [2 /*return*/, customer];
                    }
                });
            });
        };
        this.listAllCards = function (loggerInUserDetails) { return __awaiter(_this, void 0, void 0, function () {
            var cardList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.customers.listSources(loggerInUserDetails.stripeCustomerId)];
                    case 1:
                        cardList = _a.sent();
                        return [2 /*return*/, cardList];
                }
            });
        }); };
        this.updateCard = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData;
            return __awaiter(_this, void 0, void 0, function () {
                var card;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.updateSource(loggerInUserDetails.stripeCustomerId, chargeData.source, chargeData.newDetails)];
                        case 1:
                            card = _b.sent();
                            return [2 /*return*/, card];
                    }
                });
            });
        };
        this.deleteCard = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, chargeData = _a.chargeData;
            return __awaiter(_this, void 0, void 0, function () {
                var confirmation;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.deleteSource(loggerInUserDetails.stripeCustomerId, chargeData.source)];
                        case 1:
                            confirmation = _b.sent();
                            return [2 /*return*/, confirmation];
                    }
                });
            });
        };
        this.createPayment = function (_a) {
            var loggerInUserDetails = _a.loggerInUserDetails, charge = _a.charge;
            return __awaiter(_this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, index_1.Payment.create({
                                'amount': charge.amount,
                                'status': charge.status,
                                'stripeCustomerId': loggerInUserDetails.stripeCustomerId || 0,
                                'chargeId': charge.id,
                                'user': loggerInUserDetails._id || null,
                                'cardToken': charge.source.id,
                                'transactionId': charge.balance_transaction,
                                'email': loggerInUserDetails.email,
                                'currency': charge.currency,
                                'failureCode': charge.failure_code,
                                'failureMessage': charge.failure_message,
                                'gateWay': 'stride'
                            })];
                        case 1:
                            payment = _b.sent();
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        this.createSubscription = function (customer) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.subscriptions.create({
                            customer: customer.stripeCustomerId,
                            items: [
                                { price: config_1.config.STRIPE_PRICEID },
                            ],
                            metadata: {
                                name: customer.fullName,
                                email: customer.email
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.constructEvent = function (body, stripeSignature) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.stripe.webhooks.constructEvent(body, stripeSignature, config_1.config.STRIPE_WEBHOOK_SECRET)];
            });
        }); };
        this.getCardDetails = function (customerId, cardToken) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.stripe.customers.retrieveSource(customerId, cardToken)];
            });
        }); };
        this.cancelSubscription = function (subscriptionId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.stripe.subscriptions.update(subscriptionId, {
                            cancel_at_period_end: true
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addNewCard = function (_a) {
            var customer_id = _a.customer_id, card_token = _a.card_token;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.createSource(customer_id, { source: card_token })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.updateDefaultCard = function (_a) {
            var customer_id = _a.customer_id, card_id = _a.card_id;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.stripe.customers.update(customer_id, { default_source: card_id })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        this.createSubscriptionPayment = function (_a, cardToken) {
            var loggerInUserDetails = _a.loggerInUserDetails, sub = _a.sub;
            return __awaiter(_this, void 0, void 0, function () {
                var payment;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, index_1.Payment.create({
                                type: 'subscription',
                                amount: constants_1.APP_CONST.PRICES.SUB_AMOUNT,
                                stripeCustomerId: sub.customer,
                                subscriptionId: sub.id,
                                user: loggerInUserDetails._id || null,
                                email: loggerInUserDetails.email,
                                currency: 'gbp',
                                cardToken: cardToken ? cardToken : null,
                                gateWay: 'stripe',
                            })];
                        case 1:
                            payment = _b.sent();
                            return [2 /*return*/, payment];
                    }
                });
            });
        };
        this.createRefundForCharge = function (refundData) { return __awaiter(_this, void 0, void 0, function () {
            var penny, numberAfterDecimal, formattedAmount, refund;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        penny = 100;
                        numberAfterDecimal = 2;
                        formattedAmount = parseInt((refundData.amount * penny).toFixed(numberAfterDecimal));
                        return [4 /*yield*/, this.stripe.refunds.create({
                                amount: formattedAmount,
                                charge: refundData.charge,
                                reason: refundData.reason
                            })];
                    case 1:
                        refund = _a.sent();
                        return [2 /*return*/, refund];
                }
            });
        }); };
        this.stripe = new stripe_1.default(config_1.config.STRIPE_SECRET_KEY, {
            apiVersion: "2020-08-27",
        });
    }
    return StripeService;
}());
exports.stripeService = new StripeService();
//# sourceMappingURL=stripe-service.js.map