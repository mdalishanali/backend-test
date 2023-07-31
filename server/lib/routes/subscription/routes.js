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
exports.SubscriptionRoutes = void 0;
var status = require("http-status");
var helpers_1 = require("./helpers");
var payment_error_handler_1 = require("../payment/payment-error-handler");
var SubscriptionRoutes = /** @class */ (function () {
    function SubscriptionRoutes() {
    }
    SubscriptionRoutes.get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.findAll(query)];
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
    SubscriptionRoutes.getAllPlans = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, user, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    user = req.user;
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.findAllPlans(query)];
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
    SubscriptionRoutes.getPricingList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var productId, prices, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.pricesList(productId)];
                case 2:
                    prices = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = prices;
                    return [2 /*return*/, next()];
                case 3:
                    error_3 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_3, next);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    SubscriptionRoutes.createProductPricing = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var document_1, pricingPlan, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    document_1 = req.body.document;
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.createPricing(document_1)];
                case 1:
                    pricingPlan = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = pricingPlan;
                    return [2 /*return*/, next()];
                case 2:
                    error_4 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_4, next);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    SubscriptionRoutes.createSubscriptionSession = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var user, priceId, session, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    priceId = req.body.priceId;
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.createSubscriptionSession(user, priceId)];
                case 1:
                    session = _a.sent();
                    res.locals.res_obj = session;
                    res.locals.code = status.OK;
                    return [2 /*return*/, next()];
                case 2:
                    error_5 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_5, next);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    SubscriptionRoutes.webhook = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.handleStripeWebhookEvents(req, res, next)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_6, next);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    SubscriptionRoutes.deletePlan = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, helpers_1.SubscriptionHelpers.handleStripeWebhookEvents(req, res, next)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    payment_error_handler_1.PaymentErrorHandlerService.PaymentErrorHandleError(error_7, next);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return SubscriptionRoutes;
}());
exports.SubscriptionRoutes = SubscriptionRoutes;
//# sourceMappingURL=routes.js.map