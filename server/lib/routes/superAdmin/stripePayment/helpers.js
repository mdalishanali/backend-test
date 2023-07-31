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
exports.StripePaymentHelpers = void 0;
var config_1 = require("../../../config");
var helpers_1 = require("../../admin/payments/helpers");
var stripe = require("stripe")(config_1.config.STRIPE_SECRET_KEY);
var StripePaymentHelpers = /** @class */ (function () {
    function StripePaymentHelpers() {
    }
    StripePaymentHelpers.getAllChargesSuperAdmin = function (query, user) { return __awaiter(void 0, void 0, void 0, function () {
        var page, filter, searchValue, searchQuery, queryArray, min, max, min, max, from, to, startDate, startTimestamp, endDate, endTimestamp, currentDate, sellerySearchQuery, chargeQuery, charges, balance;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    page = query.page;
                    filter = query.filter;
                    searchValue = query.searchValue;
                    searchQuery = '';
                    queryArray = [];
                    if (filter === null || filter === void 0 ? void 0 : filter.status) {
                        switch (filter === null || filter === void 0 ? void 0 : filter.status) {
                            case 'Refunded':
                                queryArray.push('refunded:"true"');
                                break;
                            case 'Succeeded':
                                queryArray.push('status:"succeeded"');
                                break;
                            default:
                                queryArray.push('refunded:"false"');
                                break;
                        }
                    }
                    if (filter === null || filter === void 0 ? void 0 : filter.amount) {
                        min = (_a = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _a === void 0 ? void 0 : _a.min;
                        max = (_b = filter === null || filter === void 0 ? void 0 : filter.amount) === null || _b === void 0 ? void 0 : _b.max;
                        if (min) {
                            queryArray.push("amount>=" + min * 100);
                        }
                        if (max) {
                            queryArray.push("amount<=" + max * 100);
                        }
                    }
                    if ((filter === null || filter === void 0 ? void 0 : filter.revenue) && !(filter === null || filter === void 0 ? void 0 : filter.amount)) {
                        min = (_c = filter === null || filter === void 0 ? void 0 : filter.revenue) === null || _c === void 0 ? void 0 : _c.min;
                        max = (_d = filter === null || filter === void 0 ? void 0 : filter.revenue) === null || _d === void 0 ? void 0 : _d.max;
                        if (min) {
                            queryArray.push("amount>=" + min * 5 * 100);
                        }
                        if (max) {
                            queryArray.push("amount<=" + max * 5 * 100);
                        }
                    }
                    if (filter === null || filter === void 0 ? void 0 : filter.created) {
                        from = (_e = filter === null || filter === void 0 ? void 0 : filter.created) === null || _e === void 0 ? void 0 : _e.from;
                        to = (_f = filter === null || filter === void 0 ? void 0 : filter.created) === null || _f === void 0 ? void 0 : _f.to;
                        if (from) {
                            startDate = new Date(from);
                            startTimestamp = Math.round(startDate.getTime() / 1000);
                            queryArray.push("created>=" + startTimestamp);
                        }
                        if (to) {
                            endDate = new Date(to);
                            endTimestamp = Math.round(endDate.getTime() / 1000);
                            queryArray.push("created<=" + endTimestamp);
                        }
                    }
                    else {
                        currentDate = Math.round(new Date().getTime() / 1000);
                        searchQuery += "created<" + currentDate;
                    }
                    if (searchValue) {
                        sellerySearchQuery = "metadata['sellerName']:'" + searchValue + "'";
                        queryArray.push(sellerySearchQuery);
                    }
                    queryArray.forEach(function (item, index) {
                        if ((filter === null || filter === void 0 ? void 0 : filter.created) && index === 0) {
                            searchQuery += item;
                        }
                        else {
                            searchQuery += ' AND ' + item;
                        }
                    });
                    chargeQuery = {
                        query: searchQuery,
                        expand: [
                            "data.customer",
                            "data.transfer_data.destination",
                            "data.balance_transaction",
                        ],
                    };
                    if (page) {
                        chargeQuery.page = page;
                    }
                    return [4 /*yield*/, stripe.charges.search(chargeQuery)];
                case 1:
                    charges = _g.sent();
                    return [4 /*yield*/, stripe.balance.retrieve()];
                case 2:
                    balance = _g.sent();
                    return [2 /*return*/, {
                            balance: balance,
                            charges: charges
                        }];
            }
        });
    }); };
    StripePaymentHelpers.getAllSellersSuperAdmin = function (query, user) { return __awaiter(void 0, void 0, void 0, function () {
        var chargeParameter, from, to, startDate, startTimestamp, endDate, endTimestamp, sellers;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    chargeParameter = {
                        created: {},
                        limit: 100,
                    };
                    if (query === null || query === void 0 ? void 0 : query.next) {
                        chargeParameter.starting_after = query.next;
                    }
                    if (query === null || query === void 0 ? void 0 : query.prev) {
                        chargeParameter.ending_before = query.prev;
                    }
                    if (query === null || query === void 0 ? void 0 : query.email) {
                        chargeParameter.email = query.email;
                    }
                    if (query === null || query === void 0 ? void 0 : query.created) {
                        from = (_a = query === null || query === void 0 ? void 0 : query.created) === null || _a === void 0 ? void 0 : _a.from;
                        to = (_b = query === null || query === void 0 ? void 0 : query.created) === null || _b === void 0 ? void 0 : _b.to;
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
                    return [4 /*yield*/, stripe.accounts.list(chargeParameter)];
                case 1:
                    sellers = _c.sent();
                    sellers = sellers.data;
                    if (query === null || query === void 0 ? void 0 : query.ChargesEnabled) {
                        if ((query === null || query === void 0 ? void 0 : query.ChargesEnabled) === 'True') {
                            sellers = sellers.filter(function (item) { return item.charges_enabled; });
                        }
                        else if ((query === null || query === void 0 ? void 0 : query.ChargesEnabled) === 'False') {
                            sellers = sellers.filter(function (item) { return !item.charges_enabled; });
                        }
                    }
                    if (query === null || query === void 0 ? void 0 : query.PayoutsEnabled) {
                        if ((query === null || query === void 0 ? void 0 : query.PayoutsEnabled) === 'True') {
                            sellers = sellers.filter(function (item) { return item.payouts_enabled; });
                        }
                        else if ((query === null || query === void 0 ? void 0 : query.PayoutsEnabled) === 'False') {
                            sellers = sellers.filter(function (item) { return !item.payouts_enabled; });
                        }
                    }
                    return [2 /*return*/, sellers];
            }
        });
    }); };
    StripePaymentHelpers.getAllSellerCharges = function (stripeAccountId, query) { return __awaiter(void 0, void 0, void 0, function () {
        var chargesPromise, balancePromise, _a, charges, balance;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chargesPromise = helpers_1.PaymentHelpers.getSellerCharges(stripeAccountId, query);
                    balancePromise = helpers_1.PaymentHelpers.getSellerStripeBalance(stripeAccountId);
                    return [4 /*yield*/, Promise.all([chargesPromise, balancePromise])];
                case 1:
                    _a = _b.sent(), charges = _a[0], balance = _a[1];
                    return [2 /*return*/, { charges: charges, balance: balance }];
            }
        });
    }); };
    StripePaymentHelpers.getAllPayouts = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var filter, payoutParameter, min, max, from, to, startDate, startTimestamp, endDate, endTimestamp, payouts, balance;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
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
                    return [4 /*yield*/, stripe.payouts.list(payoutParameter)];
                case 1:
                    payouts = _e.sent();
                    return [4 /*yield*/, stripe.balance.retrieve()];
                case 2:
                    balance = _e.sent();
                    return [2 /*return*/, {
                            payouts: payouts,
                            balance: balance
                        }];
            }
        });
    }); };
    StripePaymentHelpers.createPayout = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, stripe.payouts.create({
                    amount: amount * 100,
                    currency: 'usd',
                })];
        });
    }); };
    return StripePaymentHelpers;
}());
exports.StripePaymentHelpers = StripePaymentHelpers;
//# sourceMappingURL=helpers.js.map