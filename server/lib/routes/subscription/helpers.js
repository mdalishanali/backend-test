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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionHelpers = void 0;
var config_1 = require("../../config");
var db_1 = require("../../db");
var stripe = require('stripe')(config_1.config.STRIPE_SECRET_KEY);
// Internal Dependencies
var SubscriptionHelpers = /** @class */ (function () {
    function SubscriptionHelpers() {
    }
    SubscriptionHelpers.findAll = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, dateQuery, dateQuery, userLookupQuery, subscriptionPlanLookupQuery, addFielduser, addFieldSubscriptionPlan, matchQuery, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            page = parseInt(query.page) || 1;
            limit = parseInt(query.pageSize) || 50;
            skips = (page - 1) * limit;
            searchValue = query.searchValue;
            allFilter = {};
            filter = query.filter;
            applyFilter = [];
            if (filter === null || filter === void 0 ? void 0 : filter.type) {
                applyFilter.push({ 'subscriptionPlan.type': filter.type });
            }
            if (filter === null || filter === void 0 ? void 0 : filter.subscriptionStartDate) {
                dateQuery = {
                    currentPeriodStarts: {},
                };
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionStartDate.from) {
                    dateQuery.currentPeriodStarts['$gte'] = Math.floor(new Date(filter.subscriptionStartDate.from).getTime() / 1000);
                }
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionStartDate.to) {
                    dateQuery.currentPeriodStarts['$lte'] = Math.floor(new Date(filter.subscriptionStartDate.to).getTime() / 1000);
                }
                applyFilter.push(dateQuery);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate) {
                dateQuery = {
                    currentPeriodEnds: {},
                };
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate.from) {
                    dateQuery.currentPeriodEnds['$gte'] = Math.floor(new Date(filter.subscriptionEndDate.from).getTime() / 1000);
                }
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate.to) {
                    dateQuery.currentPeriodEnds['$lte'] = Math.floor(new Date(filter.subscriptionEndDate.to).getTime() / 1000);
                }
                applyFilter.push(dateQuery);
            }
            userLookupQuery = {
                $lookup: {
                    from: 'users',
                    localField: 'userRef',
                    foreignField: '_id',
                    as: 'user',
                },
            };
            subscriptionPlanLookupQuery = {
                $lookup: {
                    from: 'subscriptionplans',
                    localField: 'subscriptionPlanRef',
                    foreignField: '_id',
                    as: 'subscriptionPlan',
                },
            };
            addFielduser = {
                $addFields: {
                    user: { $arrayElemAt: ['$user', 0] },
                },
            };
            addFieldSubscriptionPlan = {
                $addFields: {
                    subscriptionPlan: { $arrayElemAt: ['$subscriptionPlan', 0] },
                },
            };
            if (applyFilter.length) {
                allFilter['$and'] = applyFilter;
            }
            matchQuery = {
                $match: allFilter,
            };
            paginationQuery = {
                $facet: {
                    data: [
                        {
                            $skip: skips,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                    count: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            };
            aggregatePipeline = [
                matchQuery,
                userLookupQuery,
                subscriptionPlanLookupQuery,
                addFielduser,
                addFieldSubscriptionPlan,
            ];
            if (searchValue.length) {
                searchQuery = {
                    $match: {
                        $or: [
                            {
                                'subscriptionPlan.name': {
                                    $regex: searchValue,
                                    $options: 'i',
                                },
                            },
                        ],
                    },
                };
                aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [searchQuery]);
            }
            aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [matchQuery, paginationQuery]);
            data = db_1.Subscription.aggregate(aggregatePipeline);
            return [2 /*return*/, data];
        });
    }); };
    SubscriptionHelpers.findAllPlans = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, query_1, dateQuery, dateQuery, matchQuery, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            page = parseInt(query.page) || 1;
            limit = parseInt(query.pageSize) || 50;
            skips = (page - 1) * limit;
            searchValue = query.searchValue;
            allFilter = {};
            filter = query.filter;
            applyFilter = [];
            if (filter === null || filter === void 0 ? void 0 : filter.price) {
                query_1 = numberQuery(filter.price, 'price');
                query_1 ? applyFilter.push(query_1) : null;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.createdDate) {
                dateQuery = {
                    createdAt: {},
                };
                if (filter === null || filter === void 0 ? void 0 : filter.createdDate.from) {
                    dateQuery.createdAt['$gte'] = new Date(filter.createdDate.from);
                }
                if (filter === null || filter === void 0 ? void 0 : filter.createdDate.to) {
                    dateQuery.createdAt['$lte'] = new Date(filter.createdDate.to);
                }
                applyFilter.push(dateQuery);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate) {
                dateQuery = {
                    currentPeriodEnds: {},
                };
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate.from) {
                    dateQuery.currentPeriodEnds['$gte'] = Math.floor(new Date(filter.subscriptionEndDate.from).getTime() / 1000);
                }
                if (filter === null || filter === void 0 ? void 0 : filter.subscriptionEndDate.to) {
                    dateQuery.currentPeriodEnds['$lte'] = Math.floor(new Date(filter.subscriptionEndDate.to).getTime() / 1000);
                }
                applyFilter.push(dateQuery);
            }
            if (applyFilter.length) {
                allFilter['$and'] = applyFilter;
            }
            matchQuery = {
                $match: allFilter,
            };
            paginationQuery = {
                $facet: {
                    data: [
                        {
                            $skip: skips,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                    count: [
                        {
                            $count: 'count',
                        },
                    ],
                },
            };
            aggregatePipeline = [];
            if (searchValue.length) {
                searchQuery = {
                    $match: {
                        name: { $regex: searchValue, $options: 'i' },
                    },
                };
                aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [searchQuery]);
            }
            aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [matchQuery, paginationQuery]);
            data = db_1.SubscriptionPlan.aggregate(aggregatePipeline);
            return [2 /*return*/, data];
        });
    }); };
    SubscriptionHelpers.createPricing = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        var productParameter, product, priceParameter, price, subscriptionPlanDocument, subscriptionPlan;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productParameter = {
                        name: document.name,
                        description: document.description,
                        images: [document.productImage],
                    };
                    return [4 /*yield*/, stripe.products.create(productParameter)];
                case 1:
                    product = _a.sent();
                    priceParameter = {
                        unit_amount: document.price * 100,
                        currency: 'usd',
                        recurring: { interval: 'month' },
                        product: product.id,
                    };
                    switch (document === null || document === void 0 ? void 0 : document.type) {
                        case '3months':
                            priceParameter.recurring['interval_count'] = 3;
                            break;
                        default:
                            break;
                    }
                    return [4 /*yield*/, stripe.prices.create(priceParameter)];
                case 2:
                    price = _a.sent();
                    subscriptionPlanDocument = {
                        name: product.name,
                        type: price.recurring.interval == 'month'
                            ? 'MONTHLY'
                            : price.recurring.interval,
                        currency: price.currency,
                        price: price.unit_amount / 100,
                        description: product.description,
                        productId: product.id,
                        priceId: price.id,
                    };
                    return [4 /*yield*/, db_1.SubscriptionPlan.create(subscriptionPlanDocument)];
                case 3:
                    subscriptionPlan = _a.sent();
                    return [2 /*return*/, { subscriptionPlan: subscriptionPlan, price: price }];
            }
        });
    }); };
    SubscriptionHelpers.pricesList = function (productId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, stripe.prices.list({
                    limit: 20,
                    product: productId,
                    expand: ['data.product'],
                })];
        });
    }); };
    SubscriptionHelpers.createSubscriptionSession = function (user, priceId) { return __awaiter(void 0, void 0, void 0, function () {
        var customer, newCustomer, session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user.stripeCustomerId) return [3 /*break*/, 1];
                    customer = user.stripeCustomerId;
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, stripe.customers.create({
                        name: user.fullName,
                        address: {
                            line1: '510 Townsend St',
                            postal_code: '98140',
                            city: 'San Francisco',
                            state: 'CA',
                            country: 'US',
                        },
                    })];
                case 2:
                    newCustomer = _a.sent();
                    return [4 /*yield*/, db_1.User.updateOne({ _id: user._id }, { stripeCustomerId: newCustomer.id }, { new: true })];
                case 3:
                    _a.sent();
                    customer = newCustomer.id;
                    _a.label = 4;
                case 4: return [4 /*yield*/, stripe.checkout.sessions.create({
                        mode: 'subscription',
                        line_items: [
                            {
                                price: priceId,
                                quantity: 1,
                            },
                        ],
                        success_url: "http://" + config_1.config.HOST + "/payment/success",
                        cancel_url: "http://" + config_1.config.HOST + "/",
                        customer: customer,
                    })];
                case 5:
                    session = _a.sent();
                    return [2 /*return*/, session];
            }
        });
    }); };
    SubscriptionHelpers.handleStripeWebhookEvents = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            event = req.body;
            try {
                res.sendStatus(200);
                setImmediate(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, paymentIntent, failedPaymentIntent, subscriptionSuccess, user, plan, isSubscriptionPlanPresent, subscriptionPlan, subscriptionPlanDocument, subscriptionDocument, subscribedDocument, subscription, error_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 15, , 16]);
                                _a = event.type;
                                switch (_a) {
                                    case 'payment_intent.succeeded': return [3 /*break*/, 1];
                                    case 'payment_intent.payment_failed': return [3 /*break*/, 2];
                                    case 'customer.subscription.updated': return [3 /*break*/, 3];
                                    case 'customer.subscription.deleted': return [3 /*break*/, 12];
                                }
                                return [3 /*break*/, 13];
                            case 1:
                                paymentIntent = event.data.object;
                                if (paymentIntent.status === 'succeeded') {
                                }
                                return [3 /*break*/, 14];
                            case 2:
                                failedPaymentIntent = event.data.object;
                                if (failedPaymentIntent.status === 'requires_payment_method') {
                                    // The payment failed and requires a new payment method
                                }
                                else if (failedPaymentIntent.status === 'canceled') {
                                    // set the status to false
                                }
                                return [3 /*break*/, 14];
                            case 3:
                                subscriptionSuccess = event.data.object;
                                return [4 /*yield*/, db_1.User.findOne({
                                        stripeCustomerId: subscriptionSuccess.customer,
                                    })];
                            case 4:
                                user = _b.sent();
                                return [4 /*yield*/, stripe.plans.retrieve(subscriptionSuccess.plan.id, { expand: ['product'] })];
                            case 5:
                                plan = _b.sent();
                                return [4 /*yield*/, db_1.SubscriptionPlan.findOne({
                                        priceId: plan.id,
                                    })];
                            case 6:
                                isSubscriptionPlanPresent = _b.sent();
                                subscriptionPlan = void 0;
                                if (!isSubscriptionPlanPresent) return [3 /*break*/, 7];
                                subscriptionPlan = isSubscriptionPlanPresent;
                                return [3 /*break*/, 9];
                            case 7:
                                subscriptionPlanDocument = {
                                    name: plan.product.name,
                                    type: plan.interval == 'month' ? 'MONTHLY' : plan.interval,
                                    currency: plan.currency,
                                    price: plan.amount / 100,
                                    description: plan.product.description,
                                    productId: plan.product.id,
                                    priceId: plan.id,
                                };
                                return [4 /*yield*/, db_1.SubscriptionPlan.create(subscriptionPlanDocument)];
                            case 8:
                                subscriptionPlan = _b.sent();
                                _b.label = 9;
                            case 9:
                                subscriptionDocument = {
                                    userRef: user._id,
                                    currentPeriodStarts: subscriptionSuccess.current_period_start,
                                    currentPeriodEnds: subscriptionSuccess.current_period_end,
                                    subscriptionId: subscriptionSuccess.id,
                                    status: subscriptionSuccess.status,
                                    planId: subscriptionSuccess.plan.id,
                                    subscriptionPlanRef: subscriptionPlan._id,
                                };
                                return [4 /*yield*/, SubscriptionHelpers.createSubscription(subscriptionDocument)];
                            case 10:
                                subscribedDocument = _b.sent();
                                return [4 /*yield*/, db_1.User.updateOne({ stripeCustomerId: subscriptionSuccess.customer }, {
                                        subscriptionRef: subscribedDocument._id,
                                        subscriptionStatus: subscriptionSuccess.status,
                                    }, { new: true })];
                            case 11:
                                _b.sent();
                                return [3 /*break*/, 14];
                            case 12:
                                subscription = event.data.object;
                                // const { status, current_period_end } = subscription;
                                // if (status === 'canceled') {
                                //   const user = await StripeHelpers.updateSubscriptionCancellationRequested(subscription.customer, current_period_end);
                                // }
                                return [3 /*break*/, 14];
                            case 13: 
                            // Handle other event types if necessary
                            return [3 /*break*/, 14];
                            case 14: return [3 /*break*/, 16];
                            case 15:
                                error_1 = _b.sent();
                                console.log('error: ', error_1);
                                next(error_1);
                                return [3 /*break*/, 16];
                            case 16: return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                next(error);
            }
            return [2 /*return*/];
        });
    }); };
    SubscriptionHelpers.createSubscription = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, db_1.Subscription.create(document)];
        });
    }); };
    SubscriptionHelpers.deleteProductPlan = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Subscription.create(document)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return SubscriptionHelpers;
}());
exports.SubscriptionHelpers = SubscriptionHelpers;
var numberQuery = function (filter, key) {
    var _a;
    if ((filter === null || filter === void 0 ? void 0 : filter.min) && (filter === null || filter === void 0 ? void 0 : filter.max)) {
        var numberQuery_1 = (_a = {},
            _a[key] = {
                $gte: parseInt(filter.min),
                $lte: parseInt(filter.max),
            },
            _a);
        return numberQuery_1;
    }
};
//# sourceMappingURL=helpers.js.map