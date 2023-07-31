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
exports.TodoHelpers = void 0;
// NPM Dependencies
var status = require("http-status");
var StandardError = require("standard-error");
var ObjectId = require('mongodb').ObjectId;
// Internal Dependencies
var db_1 = require("../../db");
var TodoHelpers = /** @class */ (function () {
    function TodoHelpers() {
    }
    TodoHelpers.findOne = function (id, companyId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Todo
                        .findOne({ _id: id, companyId: companyId })
                        .populate('')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    TodoHelpers.findAll = function (query, user) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, companyId, allFilter, matchQuery, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = parseInt(query.page) || 1;
                    limit = parseInt(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    companyId = query.companyId;
                    allFilter = {};
                    matchQuery = {
                        $match: allFilter
                    };
                    if (companyId) {
                        allFilter['companyId'] = ObjectId(companyId);
                    }
                    if (user.roles === 'Admin') {
                        allFilter['companyId'] = user.companyId._id;
                    }
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
                    aggregatePipeline = [
                        matchQuery,
                        paginationQuery
                    ];
                    if (searchValue.length) {
                        searchQuery = { $match: { $text: { $search: searchValue } } };
                        aggregatePipeline = __spreadArray([searchQuery], aggregatePipeline);
                    }
                    return [4 /*yield*/, db_1.Todo.aggregate(aggregatePipeline)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    TodoHelpers.findAndUpdate = function (_a) {
        var id = _a.id, update = _a.update;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db_1.Todo
                            .findByIdAndUpdate(id, update, { new: true })
                            .populate('')];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    TodoHelpers.create = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Todo
                        .create(document)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    TodoHelpers.softDelete = function (id, user) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Todo
                        .findByIdAndUpdate(id, { isVisible: false }).setOptions({
                        deleteOperation: true,
                        user: user,
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    TodoHelpers.authenticate = function (doc, user) {
        if (doc.companyId.toString() !== user.companyId._id.toString()) {
            throw new StandardError({ message: 'This document does not belong to the user', code: status.UNAUTHORIZED });
        }
    };
    return TodoHelpers;
}());
exports.TodoHelpers = TodoHelpers;
var dateFilterQuery = function (filter, key) {
    var _a;
    if ((filter === null || filter === void 0 ? void 0 : filter.from) && (filter === null || filter === void 0 ? void 0 : filter.to)) {
        var dateQuery = (_a = {},
            _a[key] = {
                $gte: new Date(filter.from),
                $lt: new Date(filter.to)
            },
            _a);
        return dateQuery;
    }
};
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
var regexSearchQuery = function (key, value) {
    var _a;
    return _a = {}, _a[key] = { $regex: '_*' + value + "_*", $options: "i" }, _a;
};
//# sourceMappingURL=helpers.js.map