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
exports.PaymentHelpers = void 0;
var db_1 = require("../../../db");
var moment = require("moment");
var config_1 = require("../../../config");
var stripe = require("stripe")(config_1.config.STRIPE_SECRET_KEY);
var PaymentHelpers = /** @class */ (function () {
    function PaymentHelpers() {
    }
    PaymentHelpers.getAllPayments = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, matchObj, data, processedData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = Number(query.page) || 1;
                    limit = Number(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    matchObj = {};
                    if (Boolean(searchValue)) {
                        matchObj.$text = { $search: searchValue };
                    }
                    if (Boolean(query.dateFrom) && Boolean(query.dateTo)) {
                        matchObj.createdAt = { $gte: new Date(query.dateFrom), $lt: new Date(query.dateTo) };
                    }
                    return [4 /*yield*/, db_1.Payment.aggregate([
                            {
                                $match: matchObj
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    localField: 'user',
                                    foreignField: '_id',
                                    as: 'userData',
                                },
                            },
                            {
                                $lookup: {
                                    from: 'refunds',
                                    localField: '_id',
                                    foreignField: 'paymentId',
                                    as: 'refunds',
                                },
                            },
                            {
                                $sort: { createdAt: -1 }
                            },
                            {
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
                            },
                        ])];
                case 1:
                    data = _a.sent();
                    processedData = data[0].data.map(function (item) {
                        var penny = 100;
                        var numberAfterDecimal = 2;
                        item.amount = (item.amount / penny).toFixed(numberAfterDecimal);
                        item.userName = item.userData[0].name.first + " " + item.userData[0].name.last;
                        item.epochTime = moment(item.createdAt).valueOf();
                        delete item.userData;
                        item.refunds = item.refunds.map(function (refund) {
                            refund.amount = (refund.amount / penny).toFixed(numberAfterDecimal);
                            refund.epochTime = moment(refund.createdAt).valueOf();
                            return refund;
                        });
                        return item;
                    });
                    data[0].data = processedData;
                    return [2 /*return*/, data];
            }
        });
    }); };
    PaymentHelpers.getPaymentById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Payment.findById(id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    PaymentHelpers.createRefund = function (redundData) { return __awaiter(void 0, void 0, void 0, function () {
        var refundObj, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refundObj = {
                        paymentId: redundData.paymentId,
                        chargeId: redundData.charge,
                        status: redundData.status,
                        created: redundData.created,
                        refundId: redundData.id,
                        reason: redundData.reason,
                        amount: redundData.amount,
                        currency: redundData.currency,
                        user: redundData.user
                    };
                    return [4 /*yield*/, db_1.Refund.create(refundObj)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    PaymentHelpers.getSellerCharges = function (stripeAccountId, query) { return __awaiter(void 0, void 0, void 0, function () {
        var filter, chargeParameter, min, max, from, to, startDate, startTimestamp, endDate, endTimestamp;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            filter = query === null || query === void 0 ? void 0 : query.filter;
            chargeParameter = {
                expand: [
                    "data.customer",
                    "data.transfer_data.destination",
                    "data.balance_transaction",
                    "total_count",
                ],
                amount: {},
                created: {},
            };
            if (filter === null || filter === void 0 ? void 0 : filter.amount) {
                min = (_a = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _a === void 0 ? void 0 : _a.min;
                max = (_b = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _b === void 0 ? void 0 : _b.max;
                if (min) {
                    chargeParameter.amount["gte"] = min * 100;
                }
                if (max) {
                    chargeParameter.amount["lte"] = max * 100;
                }
            }
            if (filter === null || filter === void 0 ? void 0 : filter.created) {
                from = (_c = filter === null || filter === void 0 ? void 0 : filter.created) === null || _c === void 0 ? void 0 : _c.from;
                to = (_d = filter === null || filter === void 0 ? void 0 : filter.created) === null || _d === void 0 ? void 0 : _d.to;
                if (from) {
                    startDate = new Date(from);
                    startTimestamp = Math.round(startDate.getTime() / 1000);
                    chargeParameter.created["gte"] = startTimestamp;
                }
                if (to) {
                    endDate = new Date(to);
                    endTimestamp = Math.round(endDate.getTime() / 1000);
                    chargeParameter.created["lte"] = endTimestamp;
                }
            }
            return [2 /*return*/, stripe.charges.list(chargeParameter, {
                    stripeAccount: stripeAccountId
                })];
        });
    }); };
    PaymentHelpers.getSellerPayouts = function (stripeAccountId, query) { return __awaiter(void 0, void 0, void 0, function () {
        var filter, payoutParameter, min, max, from, to, startDate, startTimestamp, endDate, endTimestamp;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            filter = query === null || query === void 0 ? void 0 : query.filter;
            payoutParameter = {
                limit: 20,
                expand: [
                    "data.destination",
                    "data.balance_transaction",
                ],
                created: {},
                amount: {},
            };
            if (filter === null || filter === void 0 ? void 0 : filter.status) {
                payoutParameter['status'] = filter === null || filter === void 0 ? void 0 : filter.status;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.amount) {
                min = (_a = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _a === void 0 ? void 0 : _a.min;
                max = (_b = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _b === void 0 ? void 0 : _b.max;
                if (min) {
                    payoutParameter.amount["gte"] = min * 100;
                }
                if (max) {
                    payoutParameter.amount["lte"] = max * 100;
                }
            }
            if (filter === null || filter === void 0 ? void 0 : filter.created) {
                from = (_c = filter === null || filter === void 0 ? void 0 : filter.created) === null || _c === void 0 ? void 0 : _c.from;
                to = (_d = filter === null || filter === void 0 ? void 0 : filter.created) === null || _d === void 0 ? void 0 : _d.to;
                if (from) {
                    startDate = new Date(from);
                    startTimestamp = Math.round(startDate.getTime() / 1000);
                    payoutParameter.created["gte"] = startTimestamp;
                }
                if (to) {
                    endDate = new Date(to);
                    endTimestamp = Math.round(endDate.getTime() / 1000);
                    payoutParameter.created["lte"] = endTimestamp;
                }
            }
            if (query === null || query === void 0 ? void 0 : query.next) {
                payoutParameter['starting_after'] = query.next;
            }
            if (query === null || query === void 0 ? void 0 : query.prev) {
                payoutParameter['ending_before'] = query.prev;
            }
            return [2 /*return*/, stripe.payouts.list(payoutParameter, { stripeAccount: stripeAccountId })];
        });
    }); };
    PaymentHelpers.getSellerStripeBalance = function (stripeAccountId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, stripe.balance.retrieve({
                    stripeAccount: stripeAccountId,
                })];
        });
    }); };
    PaymentHelpers.createPayout = function (amount, stripeAccountId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, stripe.payouts.create({
                    amount: amount * 100,
                    currency: 'usd',
                }, { stripeAccount: stripeAccountId, })];
        });
    }); };
    return PaymentHelpers;
}());
exports.PaymentHelpers = PaymentHelpers;
//# sourceMappingURL=helpers.js.map