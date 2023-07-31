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
exports.CompanyRoutes = void 0;
var status = require("http-status");
var StandardError = require("standard-error");
var helpers_1 = require("./helpers");
var CompanyRoutes = /** @class */ (function () {
    function CompanyRoutes() {
    }
    CompanyRoutes.getCompanies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    query = req.query;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.getCompanies(query)];
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
    CompanyRoutes.getCompanyUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var companyId, query, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.id;
                    query = req.query;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.getCompanyUsers(companyId, query)];
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
    CompanyRoutes.getCompanyInviteDetails = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var companyId, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.id;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.getCompanyInviteDetails(companyId)];
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
    CompanyRoutes.editCompany = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, update, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    update = req.body.update;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.updateCompany(id, update)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_4 = _a.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CompanyRoutes.changeUserRole = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var companyId, roles, userId, data, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.id;
                    roles = req.body.update.roles;
                    userId = req.body.update._id;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.changeUserRole(userId, companyId, roles)];
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
    CompanyRoutes.resendInvites = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var email, companyId, data, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    email = req.body.document.email;
                    companyId = req.params.id;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.resendInvitation(email, companyId, req.protocol)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_6 = _a.sent();
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CompanyRoutes.inviteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var emails, companyId, userId, data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    emails = req.body.document.emails.length > 0 ? req.body.document.emails : [];
                    companyId = req.params.id;
                    userId = req.user._id;
                    if (emails.length < 1) {
                        throw new StandardError({
                            message: 'At least one email is required',
                            code: status.CONFLICT,
                        });
                    }
                    return [4 /*yield*/, helpers_1.CompanyHelpers.inviteUsers(emails, companyId, userId, req.protocol)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_7 = _a.sent();
                    next(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CompanyRoutes.cancelInvite = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var inviteId, companyId, data, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    inviteId = req.body.update._id;
                    companyId = req.params.id;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.cancelInvite(inviteId, companyId)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_8 = _a.sent();
                    next(error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    CompanyRoutes.getCompanyDetails = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var companyId, data, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.id;
                    return [4 /*yield*/, helpers_1.CompanyHelpers.getCompanyDetails(companyId)];
                case 1:
                    data = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { data: data };
                    return [2 /*return*/, next()];
                case 2:
                    error_9 = _a.sent();
                    next(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return CompanyRoutes;
}());
exports.CompanyRoutes = CompanyRoutes;
//# sourceMappingURL=routes.js.map