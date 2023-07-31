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
exports.PaymentRoutes = void 0;
var status = require("http-status");
var index_1 = require("./../../db/index");
var stripe_service_1 = require("./../../services/stripe-service");
var payment_error_handler_1 = require("./payment-error-handler");
var paypal_service_1 = require("./../../services/paypal-service");
var email_1 = require("./../../services/email");
var user_helper_1 = require("./helpers/user.helper");
var config_1 = require("../../config");
var stripe = require("stripe")(config_1.config.STRIPE_SECRET_KEY);
var PaymentRoutes = /** @class */ (function () {
    function PaymentRoutes() {
    }
    PaymentRoutes.getPayments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, payments, paymentClone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    return [4 /*yield*/, index_1.Payment.find({ user: loggerInUserDetails._id })];
                case 1:
                    payments = _a.sent();
                    paymentClone = JSON.parse(JSON.stringify(payments));
                    paymentClone.forEach(function (ele, i) { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(paymentClone[i].stripeCustomerId !== '0')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, stripe_service_1.stripeService.getCardDetails(paymentClone[i].stripeCustomerId, paymentClone[i].cardToken)];
                                case 1:
                                    data = _a.sent();
                                    paymentClone[i]['cardDetails'] = data;
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    res.locals.code = status.OK;
                    res.locals.res_obj = paymentClone;
                    return [2 /*return*/, next()];
            }
        });
    }); };
    PaymentRoutes.getPaymentsById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userDetails, payments, paymentClone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    return [4 /*yield*/, index_1.User.findById(id)];
                case 1:
                    userDetails = _a.sent();
                    return [4 /*yield*/, index_1.Payment.find({ user: userDetails._id })];
                case 2:
                    payments = _a.sent();
                    paymentClone = JSON.parse(JSON.stringify(payments));
                    paymentClone.forEach(function (ele, i) { return __awaiter(void 0, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(paymentClone[i].stripeCustomerId !== '0')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, stripe_service_1.stripeService.getCardDetails(paymentClone[i].stripeCustomerId, paymentClone[i].cardToken)];
                                case 1:
                                    data = _a.sent();
                                    paymentClone[i]['cardDetails'] = data;
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    res.locals.code = status.OK;
                    res.locals.res_obj = paymentClone;
                    return [2 /*return*/, next()];
            }
        });
    }); };
    PaymentRoutes.getUserCardDetails = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, defaultCardToken, stripeCustomerId, cardDetails;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, index_1.User.findById(req.params.userId)];
                case 1:
                    _a = _b.sent(), defaultCardToken = _a.defaultCardToken, stripeCustomerId = _a.stripeCustomerId;
                    if (!(defaultCardToken && stripeCustomerId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, stripe_service_1.stripeService.getCardDetails(stripeCustomerId, defaultCardToken)];
                case 2:
                    cardDetails = _b.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = cardDetails;
                    return [2 /*return*/, next()];
                case 3:
                    res.locals.code = status.OK;
                    res.locals.res_obj = { message: 'Not a Subscribed User' };
                    return [2 /*return*/, next()];
            }
        });
    }); };
    PaymentRoutes.createCharge = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, chargeData, customer, charge, user, source, user, payment, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    chargeData = req.body.chargeData;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 13, , 14]);
                    if (!(!loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard)) return [3 /*break*/, 5];
                    return [4 /*yield*/, stripe_service_1.stripeService.createCustomer({ loggerInUserDetails: loggerInUserDetails, chargeData: chargeData })];
                case 2:
                    customer = _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, {
                            $push: { cardTokens: chargeData.token.card.id },
                            stripeCustomerId: customer.id,
                            defaultCardToken: customer.default_source,
                        })];
                case 3:
                    user = _a.sent();
                    loggerInUserDetails.stripeCustomerId = customer.id;
                    return [4 /*yield*/, stripe_service_1.stripeService.createChargeWithSavedCard({ loggerInUserDetails: loggerInUserDetails, chargeData: chargeData })];
                case 4:
                    charge = _a.sent();
                    return [3 /*break*/, 11];
                case 5:
                    if (!(loggerInUserDetails.stripeCustomerId && chargeData.saveThisCard)) return [3 /*break*/, 9];
                    return [4 /*yield*/, stripe_service_1.stripeService.createSource({ loggerInUserDetails: loggerInUserDetails, chargeData: chargeData })];
                case 6:
                    source = _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, { $push: { cardTokens: source.id } }, { new: true })];
                case 7:
                    user = _a.sent();
                    return [4 /*yield*/, stripe_service_1.stripeService.createChargeWithSource({ loggerInUserDetails: loggerInUserDetails, chargeData: chargeData, source: source })];
                case 8:
                    charge = _a.sent();
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, stripe_service_1.stripeService.createChargeWithOutSavedCard(chargeData)];
                case 10:
                    charge = _a.sent();
                    _a.label = 11;
                case 11: return [4 /*yield*/, stripe_service_1.stripeService.createPayment({ loggerInUserDetails: loggerInUserDetails, charge: charge })];
                case 12:
                    payment = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = payment;
                    return [2 /*return*/, next()];
                case 13:
                    error_1 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_1, next);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.changeSavedCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, customer_id, card_token, _id, newCard, customer, updatedUser, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, customer_id = _a.customer_id, card_token = _a.card_token, _id = _a._id;
                    return [4 /*yield*/, stripe_service_1.stripeService.addNewCard({
                            customer_id: customer_id,
                            card_token: card_token,
                        })];
                case 1:
                    newCard = _b.sent();
                    if (!newCard) return [3 /*break*/, 4];
                    return [4 /*yield*/, stripe_service_1.stripeService.updateDefaultCard({
                            customer_id: customer_id,
                            card_id: newCard.id,
                        })];
                case 2:
                    customer = _b.sent();
                    if (!customer) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.User.update({ _id: _id }, {
                            $addToSet: { cardTokens: newCard.id },
                            defaultCardToken: newCard.id,
                        })];
                case 3:
                    updatedUser = _b.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = updatedUser;
                    return [2 /*return*/, next()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _b.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_2, next);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.retrieveSavedCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, cardList, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!(loggerInUserDetails && loggerInUserDetails.stripeCustomerId)) return [3 /*break*/, 3];
                    return [4 /*yield*/, stripe_service_1.stripeService.listAllCards(loggerInUserDetails)];
                case 2:
                    cardList = _a.sent();
                    if (cardList && cardList.data && cardList.data.length > 0) {
                        res.locals.code = status.OK;
                        res.locals.res_obj = cardList.data;
                    }
                    else {
                        res.locals.code = status.NO_CONTENT;
                        res.locals.res_obj = {};
                    }
                    return [3 /*break*/, 4];
                case 3:
                    res.locals.code = status.NO_CONTENT;
                    res.locals.res_obj = {};
                    _a.label = 4;
                case 4: return [2 /*return*/, next()];
                case 5:
                    error_3 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_3, next);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.updateCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, chargeData, confirmation, updatedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    chargeData = req.body.chargeData;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, stripe_service_1.stripeService.updateCard({
                            loggerInUserDetails: loggerInUserDetails,
                            chargeData: chargeData,
                        })];
                case 2:
                    confirmation = _a.sent();
                    if (!Boolean(confirmation)) return [3 /*break*/, 4];
                    return [4 /*yield*/, index_1.User.findById(loggerInUserDetails._id)];
                case 3:
                    updatedUser = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = updatedUser;
                    return [2 /*return*/, next()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_4, next);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.chargeSavedCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, chargeData, charge, payment, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    loggerInUserDetails = req.user;
                    chargeData = req.body.chargeData;
                    return [4 /*yield*/, stripe_service_1.stripeService.createChargeWithSavedCard({
                            loggerInUserDetails: loggerInUserDetails,
                            chargeData: chargeData,
                        })];
                case 1:
                    charge = _a.sent();
                    return [4 /*yield*/, stripe_service_1.stripeService.createPayment({
                            loggerInUserDetails: loggerInUserDetails,
                            charge: charge,
                        })];
                case 2:
                    payment = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = payment;
                    return [2 /*return*/, next()];
                case 3:
                    error_5 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_5, next);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.chargeGuestCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var chargeData, charge, loggerInUserDetails, payment, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    chargeData = req.body.chargeData;
                    return [4 /*yield*/, stripe_service_1.stripeService.createChargeWithOutSavedCard(chargeData)];
                case 1:
                    charge = _a.sent();
                    loggerInUserDetails = { email: chargeData.email };
                    return [4 /*yield*/, stripe_service_1.stripeService.createPayment({
                            loggerInUserDetails: loggerInUserDetails,
                            charge: charge,
                        })];
                case 2:
                    payment = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = payment;
                    return [2 /*return*/, next()];
                case 3:
                    error_6 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_6, next);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.savePayPalPayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, payPalData, payment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    payPalData = req.body.paypalResponse;
                    return [4 /*yield*/, paypal_service_1.payPalService.savePayPalPayment(loggerInUserDetails, payPalData)];
                case 1:
                    payment = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = payment;
                    return [2 /*return*/, next()];
            }
        });
    }); };
    PaymentRoutes.saveCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, chargeData, customer, user, source, user, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    chargeData = req.body.chargeData;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    if (!!loggerInUserDetails.stripeCustomerId) return [3 /*break*/, 4];
                    return [4 /*yield*/, stripe_service_1.stripeService.createCustomer({
                            loggerInUserDetails: loggerInUserDetails,
                            chargeData: chargeData,
                        })];
                case 2:
                    customer = _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, {
                            $push: { cardTokens: chargeData.token.card.id },
                            stripeCustomerId: customer.id,
                            defaultCardToken: customer.default_source,
                        }, { new: true })];
                case 3:
                    user = _a.sent();
                    res.locals.res_obj = user;
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, stripe_service_1.stripeService.createSource({
                        loggerInUserDetails: loggerInUserDetails,
                        chargeData: chargeData,
                    })];
                case 5:
                    source = _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, { $push: { cardTokens: source.id } }, { new: true })];
                case 6:
                    user = _a.sent();
                    res.locals.res_obj = user;
                    _a.label = 7;
                case 7:
                    res.locals.code = status.OK;
                    return [2 /*return*/, next()];
                case 8:
                    error_7 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_7, next);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.deleteCard = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var loggerInUserDetails, email, chargeData, confirmation, updatedUser, user, defaultCardToken, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggerInUserDetails = req.user;
                    email = req.user.email;
                    chargeData = req.body.chargeData;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, stripe_service_1.stripeService.deleteCard({
                            loggerInUserDetails: loggerInUserDetails,
                            chargeData: chargeData,
                        })];
                case 2:
                    confirmation = _a.sent();
                    if (!confirmation.deleted) return [3 /*break*/, 5];
                    updatedUser = void 0;
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, { $pull: { cardTokens: chargeData.source } }, { new: true })];
                case 3:
                    user = _a.sent();
                    defaultCardToken = '';
                    if (user.cardTokens && user.cardTokens.length > 0) {
                        defaultCardToken = user.cardTokens[0];
                    }
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(loggerInUserDetails._id, { defaultCardToken: defaultCardToken }, { new: true })];
                case 4:
                    updatedUser = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = updatedUser;
                    return [2 /*return*/, next()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_8 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_8, next);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.createSubscriptionCharge = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userDetails, chargeData, email, customer, sub, error_9, sub, error_10, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 18, , 19]);
                    userDetails = req.user;
                    chargeData = req.body.chargeData;
                    email = new email_1.EmailService();
                    customer = void 0;
                    if (!!userDetails.stripeCustomerId) return [3 /*break*/, 10];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 9]);
                    return [4 /*yield*/, stripe_service_1.stripeService.createCustomer({
                            loggerInUserDetails: userDetails,
                            chargeData: chargeData,
                        })];
                case 2:
                    customer = _a.sent();
                    userDetails.stripeCustomerId = customer.id;
                    return [4 /*yield*/, stripe_service_1.stripeService.createSubscription(userDetails)];
                case 3:
                    sub = _a.sent();
                    return [4 /*yield*/, stripe_service_1.stripeService.createSubscriptionPayment({ loggerInUserDetails: userDetails, sub: sub }, customer.default_source)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(userDetails._id, {
                            $push: { cardTokens: chargeData.token.card.id },
                            stripeCustomerId: customer.id,
                            defaultCardToken: customer.default_source,
                            subscriptionActiveUntil: sub.current_period_end,
                            subscriptionId: sub.id,
                        }, { new: true })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, email.newSubscriptionEmail(userDetails)];
                case 6:
                    _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = sub;
                    return [2 /*return*/, next()];
                case 7:
                    error_9 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_9, next);
                    return [4 /*yield*/, email.sendEmail({
                            subject: 'Subscricption not made successfully',
                            email: userDetails.email,
                            data: "Something went wrong " + error_9.message,
                        })];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 17];
                case 10:
                    _a.trys.push([10, 15, , 17]);
                    return [4 /*yield*/, stripe_service_1.stripeService.createSubscription(userDetails)];
                case 11:
                    sub = _a.sent();
                    return [4 /*yield*/, stripe_service_1.stripeService.createSubscriptionPayment({
                            loggerInUserDetails: req.user,
                            sub: sub,
                        })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, index_1.User.findByIdAndUpdate(userDetails.id, {
                            subscriptionActiveUntil: sub.current_period_end,
                            subscriptionId: sub.id,
                        }, { new: true })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, email.newSubscriptionEmail(userDetails)];
                case 14:
                    _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = sub;
                    return [2 /*return*/, next()];
                case 15:
                    error_10 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_10, next);
                    return [4 /*yield*/, email.sendEmail({
                            subject: 'Subscricption not made successfully',
                            email: userDetails.email,
                            data: "Something went wrong " + error_10.message + " ",
                        })];
                case 16:
                    _a.sent();
                    return [3 /*break*/, 17];
                case 17: return [3 /*break*/, 19];
                case 18:
                    error_11 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_11, next);
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.cancelRenewal = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userDetails, email, subsciber, subscriptionId, sub, error_12, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    userDetails = req.user;
                    email = new email_1.EmailService();
                    if (!req.body.subId) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_helper_1.UsersHelpers.findAll({
                            subscriptionId: req.body.subId,
                        })];
                case 1:
                    subsciber = _a.sent();
                    userDetails = subsciber[0];
                    _a.label = 2;
                case 2:
                    subscriptionId = req.body.subId || req.user.subscriptionId;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 7, , 8]);
                    return [4 /*yield*/, stripe_service_1.stripeService.cancelSubscription(subscriptionId)];
                case 4:
                    sub = _a.sent();
                    userDetails.subscriptionCancellationRequested = true;
                    return [4 /*yield*/, userDetails.save()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, email.sendCancellationEmail(userDetails)];
                case 6:
                    _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = sub;
                    return [2 /*return*/, next()];
                case 7:
                    error_12 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_12, next);
                    return [3 /*break*/, 8];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_13 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_13, next);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.createRefundForCharge = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var refundData, data, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    refundData = req.body.refundData;
                    return [4 /*yield*/, stripe_service_1.stripeService.createRefundForCharge(refundData)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_14 = _a.sent();
                    next(error_14);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    PaymentRoutes.createPaymentIntent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var item, user, product, price, seller, params, customer, paymentIntent, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    item = req.body;
                    user = req.user;
                    return [4 /*yield*/, index_1.Products.findOne({ _id: item._id, }).populate('createdBy')];
                case 1:
                    product = _a.sent();
                    price = product.price, seller = product.createdBy;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 8, , 9]);
                    params = {
                        amount: price * 100,
                        currency: "usd",
                        automatic_payment_methods: { enabled: true },
                        transfer_data: {
                            amount: Math.round(((price * 80) / 100) * 100),
                            destination: seller.stripeAccountId,
                        },
                        description: product.description,
                        shipping: {
                            name: "Shyam Babu",
                            address: {
                                line1: "Sector 9",
                                postal_code: "274301",
                                city: "San Francisco",
                                state: "CA",
                                country: "US",
                            },
                        },
                        metadata: {
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            customerName: user.fullName,
                            sellerName: seller.fullName,
                            revenue: (((price * 20) / 100) * 100)
                        },
                    };
                    if (!user.stripeCustomerId) return [3 /*break*/, 3];
                    params['customer'] = user.stripeCustomerId;
                    return [3 /*break*/, 6];
                case 3: return [4 /*yield*/, stripe.customers.create({
                        name: user.fullName,
                        address: {
                            line1: "510 Townsend St",
                            postal_code: "98140",
                            city: "San Francisco",
                            state: "CA",
                            country: "US",
                        },
                    })];
                case 4:
                    customer = _a.sent();
                    return [4 /*yield*/, index_1.User.updateOne({ _id: user._id }, { stripeCustomerId: customer.id }, { new: true })];
                case 5:
                    _a.sent();
                    params['customer'] = customer.id;
                    _a.label = 6;
                case 6: return [4 /*yield*/, stripe.paymentIntents.create(params)];
                case 7:
                    paymentIntent = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = paymentIntent;
                    return [2 /*return*/, next()];
                case 8:
                    error_15 = _a.sent();
                    next(error_15);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return PaymentRoutes;
}());
exports.PaymentRoutes = PaymentRoutes;
//# sourceMappingURL=routes.js.map