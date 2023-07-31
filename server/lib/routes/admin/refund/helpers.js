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
exports.RefundHelpers = void 0;
// Internal Dependencies
var db_1 = require("../../../db");
var RefundHelpers = /** @class */ (function () {
    function RefundHelpers() {
    }
    RefundHelpers.findOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Refund.findById(id).populate('')];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    RefundHelpers.findAll = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, allFilter, filter, applyFilter, query_1, dateQuery, orderLookupQuery, orderUnwindQuery, productLookupQuery, productUnwindQuery, orderUserLookupQuery, orderUserUnwindQuery, addOrderUserFullName, matchQuery, paginationQuery, sortingQuery, aggregatePipeline, data;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    page = parseInt(query.page) || 1;
                    limit = parseInt(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    allFilter = {};
                    filter = query.filter;
                    applyFilter = [];
                    if (filter === null || filter === void 0 ? void 0 : filter.price) {
                        query_1 = numberQuery(filter.price, 'product.price');
                        query_1 ? applyFilter.push(query_1) : null;
                    }
                    if ((_a = filter === null || filter === void 0 ? void 0 : filter.customer) === null || _a === void 0 ? void 0 : _a.length) {
                        allFilter['user.fullName'] = new RegExp(filter === null || filter === void 0 ? void 0 : filter.customer, 'i');
                    }
                    // purchaseDate
                    if (filter === null || filter === void 0 ? void 0 : filter.purchaseDate) {
                        dateQuery = {
                            createdAt: {}
                        };
                        if (filter === null || filter === void 0 ? void 0 : filter.purchaseDate.from) {
                            dateQuery.createdAt['$gte'] = new Date(filter.purchaseDate.from);
                        }
                        if (filter === null || filter === void 0 ? void 0 : filter.purchaseDate.to) {
                            dateQuery.createdAt['$lte'] = new Date(filter.purchaseDate.to);
                        }
                        applyFilter.push(dateQuery);
                    }
                    if ((_b = filter === null || filter === void 0 ? void 0 : filter.ByStatus) === null || _b === void 0 ? void 0 : _b.length) {
                        allFilter['status'] = filter === null || filter === void 0 ? void 0 : filter.ByStatus;
                    }
                    if (searchValue.length) {
                        allFilter['product.name'] = new RegExp(searchValue, 'i');
                    }
                    if (applyFilter.length) {
                        allFilter.$and = applyFilter;
                    }
                    orderLookupQuery = {
                        "$lookup": {
                            from: 'orders',
                            localField: 'orderRef',
                            foreignField: '_id',
                            as: 'order',
                        }
                    };
                    orderUnwindQuery = { "$unwind": { path: "$order" } };
                    productLookupQuery = {
                        "$lookup": {
                            from: 'products',
                            localField: 'order.productId',
                            foreignField: '_id',
                            as: 'product',
                        }
                    };
                    productUnwindQuery = { "$unwind": { path: "$product" } };
                    orderUserLookupQuery = {
                        "$lookup": {
                            from: 'users',
                            localField: 'order.userId',
                            foreignField: '_id',
                            as: 'user',
                        }
                    };
                    orderUserUnwindQuery = { "$unwind": { path: "$user" } };
                    addOrderUserFullName = {
                        $addFields: {
                            'user.fullName': {
                                $concat: [
                                    '$user.name.first',
                                    ' ',
                                    '$user.name.last'
                                ]
                            }
                        }
                    };
                    matchQuery = {
                        $match: allFilter
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
                                    $count: "count",
                                },
                            ],
                        },
                    };
                    sortingQuery = {
                        $sort: {
                            createdAt: -1
                        }
                    };
                    aggregatePipeline = [
                        sortingQuery,
                        orderLookupQuery,
                        orderUnwindQuery,
                        productLookupQuery,
                        productUnwindQuery,
                        orderUserLookupQuery,
                        orderUserUnwindQuery,
                        addOrderUserFullName,
                        matchQuery,
                        paginationQuery
                    ];
                    return [4 /*yield*/, db_1.Refund.aggregate(aggregatePipeline)];
                case 1:
                    data = _c.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    RefundHelpers.findAndUpdate = function (_a) {
        var id = _a.id, update = _a.update;
        return __awaiter(void 0, void 0, void 0, function () {
            var data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db_1.Refund.findByIdAndUpdate(id, update, { new: true }).populate('')];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    RefundHelpers.create = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Refund.create(document)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    RefundHelpers.softDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Refund.findByIdAndUpdate(id, { isVisible: false })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    return RefundHelpers;
}());
exports.RefundHelpers = RefundHelpers;
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