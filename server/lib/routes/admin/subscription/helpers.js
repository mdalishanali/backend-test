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
var db_1 = require("../../../db");
var config_1 = require("../../../config");
var stripe = require('stripe')(config_1.config.STRIPE_SECRET_KEY);
// Internal Dependencies
var SubscriptionHelpers = /** @class */ (function () {
    function SubscriptionHelpers() {
    }
    SubscriptionHelpers.findAll = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, query_1, dateQuery, dateQuery, matchQuery, userLookupQuery, subscriptionPlanLookupQuery, addFieldUser, addFieldsSubscriptionPlan, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                    if (filter === null || filter === void 0 ? void 0 : filter.status) {
                        applyFilter.push({ status: filter.status });
                    }
                    if (filter === null || filter === void 0 ? void 0 : filter.price) {
                        query_1 = numberQuery(filter.price, 'subscriptionPlan.type');
                        query_1 ? applyFilter.push(query_1) : null;
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
                    if (applyFilter.length) {
                        allFilter['$and'] = applyFilter;
                    }
                    matchQuery = {
                        $match: allFilter,
                    };
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
                    addFieldUser = {
                        $addFields: {
                            user: { $arrayElemAt: ['$user', 0] },
                        },
                    };
                    addFieldsSubscriptionPlan = {
                        $addFields: {
                            subscriptionPlan: { $arrayElemAt: ['$subscriptionPlan', 0] },
                        },
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
                        userLookupQuery,
                        subscriptionPlanLookupQuery,
                        addFieldUser,
                        addFieldsSubscriptionPlan,
                    ];
                    if (searchValue.length) {
                        searchQuery = {
                            $match: {
                                $or: [
                                    {
                                        'user.name.first': { $regex: searchValue, $options: 'i' },
                                    },
                                    {
                                        'user.name.last': { $regex: searchValue, $options: 'i' },
                                    },
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
                    return [4 /*yield*/, db_1.Subscription.aggregate(aggregatePipeline)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    SubscriptionHelpers.findAllPlans = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, query_2, dateQuery, dateQuery, matchQuery, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = parseInt(query.page) || 1;
                    limit = parseInt(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    allFilter = {};
                    filter = query.filter;
                    applyFilter = [];
                    if (filter === null || filter === void 0 ? void 0 : filter.price) {
                        query_2 = numberQuery(filter.price, 'price');
                        query_2 ? applyFilter.push(query_2) : null;
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
                    return [4 /*yield*/, db_1.SubscriptionPlan.aggregate(aggregatePipeline)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    SubscriptionHelpers.deletePlan = function (planId) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = db_1.SubscriptionPlan.findByIdAndDelete(planId);
            return [2 /*return*/, data];
        });
    }); };
    SubscriptionHelpers.updatePlan = function (planId, update) { return __awaiter(void 0, void 0, void 0, function () {
        var updateDocument, updatePlan, planPromise, dataPromise, _a, plan, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    updateDocument = {
                        name: update.name,
                        description: update.description,
                    };
                    updatePlan = {
                        name: update.name,
                        description: update.description,
                    };
                    if (update.image) {
                        updatePlan['images'] = [update.image];
                        updateDocument['image'] = update.image;
                    }
                    planPromise = stripe.products.update(update.productId, updatePlan);
                    return [4 /*yield*/, db_1.SubscriptionPlan.findByIdAndUpdate(planId, updateDocument, {
                            new: true,
                        })];
                case 1:
                    dataPromise = _b.sent();
                    return [4 /*yield*/, Promise.all([planPromise, dataPromise])];
                case 2:
                    _a = _b.sent(), plan = _a[0], data = _a[1];
                    return [2 /*return*/, 'Updated Successfully!'];
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