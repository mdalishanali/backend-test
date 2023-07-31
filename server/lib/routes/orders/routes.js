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
exports.OrderRoutes = void 0;
// NPM Dependencies
var status = require("http-status");
var config_1 = require("../../config");
var stripe = require('stripe')(config_1.config.STRIPE_SECRET_KEY);
// Internal Dependencies
var helpers_1 = require("./helpers");
var OrderRoutes = /** @class */ (function () {
    function OrderRoutes() {
    }
    OrderRoutes.get = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, user, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    console.log('query:', query);
                    user = req.user;
                    return [4 /*yield*/, helpers_1.OrdersHelpers.findAll(query, user)];
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
    OrderRoutes.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, companyId, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    companyId = req.user.companyId;
                    return [4 /*yield*/, helpers_1.OrdersHelpers.findOne(id, companyId)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_2 = _a.sent();
                    console.log('error: ', error_2);
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    OrderRoutes.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, update, doc, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    update = req.body.update;
                    return [4 /*yield*/, helpers_1.OrdersHelpers.findOne(id, req.user.companyId)];
                case 1:
                    doc = _a.sent();
                    helpers_1.OrdersHelpers.authenticate(doc, req.user);
                    return [4 /*yield*/, helpers_1.OrdersHelpers.findAndUpdate({ id: id, update: update })];
                case 2:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 3:
                    error_3 = _a.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    OrderRoutes.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a, payment_intent, productId, intent, chargeId, charge, payment_method_details, id, status_1, document_1, data, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    user = req.user;
                    _a = req.body.document, payment_intent = _a.payment_intent, productId = _a.productId;
                    return [4 /*yield*/, stripe.paymentIntents.retrieve(payment_intent)];
                case 1:
                    intent = _b.sent();
                    chargeId = intent === null || intent === void 0 ? void 0 : intent.latest_charge;
                    return [4 /*yield*/, stripe.charges.retrieve(chargeId)];
                case 2:
                    charge = _b.sent();
                    payment_method_details = charge.payment_method_details, id = charge.id, status_1 = charge.status;
                    document_1 = {
                        chargeId: id,
                        userId: user._id,
                        productId: productId,
                        paymentStatus: status_1,
                        paymentMethodDetails: payment_method_details,
                    };
                    return [4 /*yield*/, helpers_1.OrdersHelpers.create(document_1)];
                case 3:
                    data = _b.sent();
                    res.locals.code = status_1.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 4:
                    error_4 = _b.sent();
                    console.log('error: ', error_4);
                    next(error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    OrderRoutes.delete = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, doc, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    user = req.user;
                    return [4 /*yield*/, helpers_1.OrdersHelpers.findOne(id, user.companyId)];
                case 1:
                    doc = _a.sent();
                    helpers_1.OrdersHelpers.authenticate(doc, user);
                    data = helpers_1.OrdersHelpers.softDelete(id, user);
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
    return OrderRoutes;
}());
exports.OrderRoutes = OrderRoutes;
//# sourceMappingURL=routes.js.map