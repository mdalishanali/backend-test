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
exports.RefundRoutes = void 0;
var status = require("http-status");
var helpers_1 = require("./helpers");
var helpers_2 = require("../orders/helpers");
var RefundRoutes = /** @class */ (function () {
    function RefundRoutes() {
    }
    RefundRoutes.getAllPayments = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, userId, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    userId = req.user._id;
                    return [4 /*yield*/, helpers_1.RefundHelpers.getAllRefunds(query, userId)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RefundRoutes.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var document_1, createRefund, updateOrderObject, dataPromise, UpdateOrderPromise, _a, data, updateOrder, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    document_1 = req.body.document;
                    createRefund = {
                        refundedAmount: 0,
                        orderRef: document_1.orderRef,
                    };
                    updateOrderObject = {
                        id: document_1.orderRef,
                        update: {
                            paymentStatus: 'refund-pending'
                        },
                    };
                    dataPromise = helpers_1.RefundHelpers.create(createRefund);
                    UpdateOrderPromise = helpers_2.OrdersHelpers.findAndUpdate(updateOrderObject);
                    return [4 /*yield*/, Promise.all([dataPromise, UpdateOrderPromise])];
                case 1:
                    _a = _b.sent(), data = _a[0], updateOrder = _a[1];
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data, updateOrder: updateOrder };
                    return [2 /*return*/, next()];
                case 2:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return RefundRoutes;
}());
exports.RefundRoutes = RefundRoutes;
//# sourceMappingURL=routes.js.map