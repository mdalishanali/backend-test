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
exports.RefundsRoutes = void 0;
// NPM Dependencies
var status = require("http-status");
// Internal Dependencies
var helpers_1 = require("./helpers");
var config_1 = require("../../../config");
var helpers_2 = require("../../orders/helpers");
var stripe = require("stripe")(config_1.config.STRIPE_SECRET_KEY);
var RefundsRoutes = /** @class */ (function () {
    function RefundsRoutes() {
    }
    RefundsRoutes.get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    return [4 /*yield*/, helpers_1.RefundHelpers.findAll(query)];
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
    RefundsRoutes.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, helpers_1.RefundHelpers.findOne(id)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RefundsRoutes.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, update, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    update = req.body.update;
                    return [4 /*yield*/, helpers_1.RefundHelpers.findAndUpdate({ id: id, update: update })];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_3 = _a.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RefundsRoutes.initiateRefund = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var document_1, amount, chargeId, reason, orderId, refundId, refundItem, refund, charge, refunded, amount_refunded, refundStatus, updatedRefundPromise, updatedOrderPromise, _a, updatedRefund, updatedOrder, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    document_1 = req.body.document;
                    amount = document_1.amount, chargeId = document_1.chargeId, reason = document_1.reason, orderId = document_1.orderId, refundId = document_1.refundId;
                    return [4 /*yield*/, helpers_1.RefundHelpers.findOne(refundId)];
                case 1:
                    refundItem = _b.sent();
                    return [4 /*yield*/, stripe.refunds.create({
                            charge: chargeId,
                            reason: reason,
                            reverse_transfer: true,
                            amount: amount * 100
                        }, {
                            stripeAccount: config_1.config.STRIPE_ACCOUNT_ID,
                        })];
                case 2:
                    refund = _b.sent();
                    return [4 /*yield*/, stripe.charges.retrieve(chargeId)];
                case 3:
                    charge = _b.sent();
                    refunded = charge.refunded, amount_refunded = charge.amount_refunded;
                    refundStatus = 'partial-refunded';
                    if (refunded) {
                        refundStatus = 'fully-refunded';
                    }
                    else if (amount_refunded > 0) {
                        refundStatus = 'partially-refunded';
                    }
                    updatedRefundPromise = helpers_1.RefundHelpers.findAndUpdate({ id: refundId, update: { status: refundStatus, refundedAmount: amount_refunded / 100 } });
                    updatedOrderPromise = helpers_2.OrdersHelpers.findAndUpdate({ id: orderId, update: { paymentStatus: refundStatus } });
                    return [4 /*yield*/, Promise.all([updatedRefundPromise, updatedOrderPromise])];
                case 4:
                    _a = _b.sent(), updatedRefund = _a[0], updatedOrder = _a[1];
                    res.locals.code = status.OK;
                    res.locals.res_obj = { charge: charge, refund: updatedRefund, order: updatedOrder, stripeRefund: refund };
                    return [2 /*return*/, next()];
                case 5:
                    error_4 = _b.sent();
                    console.log(error_4);
                    next(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    RefundsRoutes.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var document_2, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    document_2 = req.body.document;
                    return [4 /*yield*/, helpers_1.RefundHelpers.create(document_2)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_5 = _a.sent();
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RefundsRoutes.delete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            try {
                id = req.params.id;
                helpers_1.RefundHelpers.softDelete(id);
                res.locals.code = status.OK;
                res.locals.res_obj = {};
                return [2 /*return*/, next()];
            }
            catch (error) {
                next(error);
            }
            return [2 /*return*/];
        });
    }); };
    return RefundsRoutes;
}());
exports.RefundsRoutes = RefundsRoutes;
//# sourceMappingURL=routes.js.map