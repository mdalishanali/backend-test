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
exports.ReferralHelpers = void 0;
var db_1 = require("../../../db");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var ReferralHelpers = /** @class */ (function () {
    function ReferralHelpers() {
    }
    ReferralHelpers.findAll = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, dateQuery, matchQuery, referredByLookup, referredToLookup, referredBy, referredTo, sortingQuery, paginationQuery, aggregatePipeline, searchQuery, data;
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
                    if (filter === null || filter === void 0 ? void 0 : filter.createdAt) {
                        dateQuery = {
                            createdAt: {},
                        };
                        if (filter === null || filter === void 0 ? void 0 : filter.createdAt.from) {
                            dateQuery.createdAt['$gte'] = new Date(filter.createdAt.from);
                        }
                        if (filter === null || filter === void 0 ? void 0 : filter.createdAt.to) {
                            dateQuery.createdAt['$lte'] = new Date(filter.createdAt.to);
                        }
                        applyFilter.push(dateQuery);
                    }
                    if (applyFilter.length) {
                        allFilter['$and'] = applyFilter;
                    }
                    matchQuery = {
                        $match: allFilter,
                    };
                    referredByLookup = {
                        $lookup: {
                            from: 'users',
                            localField: 'referredByRef',
                            foreignField: '_id',
                            as: 'referredBy',
                        },
                    };
                    referredToLookup = {
                        $lookup: {
                            from: 'users',
                            localField: 'referredToRef',
                            foreignField: '_id',
                            as: 'referredTo',
                        },
                    };
                    referredBy = {
                        $addFields: {
                            referredBy: {
                                $arrayElemAt: ['$referredBy', 0],
                            },
                        },
                    };
                    referredTo = {
                        $addFields: {
                            referredTo: {
                                $arrayElemAt: ['$referredTo', 0],
                            },
                        },
                    };
                    sortingQuery = {
                        $sort: {
                            createdAt: -1,
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
                        referredByLookup,
                        referredToLookup,
                        referredBy,
                        referredTo,
                    ];
                    if (searchValue.length) {
                        searchQuery = {
                            $match: {
                                $or: [
                                    { 'referredTo.name.first': { $regex: searchValue, $options: 'i' } },
                                    { 'referredTo.name.last': { $regex: searchValue, $options: 'i' } },
                                    { 'referredBy.name.first': { $regex: searchValue, $options: 'i' } },
                                    { 'referredBy.name.last': { $regex: searchValue, $options: 'i' } },
                                ],
                            },
                        };
                        aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [searchQuery]);
                    }
                    aggregatePipeline = __spreadArray(__spreadArray([], aggregatePipeline), [
                        matchQuery,
                        sortingQuery,
                        paginationQuery,
                    ]);
                    return [4 /*yield*/, db_1.Referrals.aggregate(aggregatePipeline)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    return ReferralHelpers;
}());
exports.ReferralHelpers = ReferralHelpers;
//# sourceMappingURL=helpers.js.map