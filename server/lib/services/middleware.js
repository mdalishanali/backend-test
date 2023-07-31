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
exports.Middleware = void 0;
var status = require("http-status");
var StandardError = require("standard-error");
var jwt = require("jwt-simple");
var db_1 = require("../db");
//import config
var config_1 = require("../config");
var Middleware = /** @class */ (function () {
    function Middleware() {
        var _this = this;
        this.requireLogin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!req.user) {
                    throw new StandardError({
                        message: 'Login Required',
                        code: status.UNAUTHORIZED,
                    });
                }
                // if (req?.user?.roles === 'Moderator') {
                //   const url = req.originalUrl;
                //   const hitCollectionName = url.match(/\/api\/([^?]+)/)?.[1];
                //   const invitedUser = await InvitedUsers.findOne({
                //     invitedEmail: req?.user?.email,
                //   })
                //   const userPermission = invitedUser.permissions.filter(
                //     (item) => item.access
                //   ).map((item) => item.collectionName);
                //   const hasAccess = userPermission.includes(hitCollectionName + "s")
                //   if (!hasAccess) {
                //     throw new StandardError({
                //       message: 'You do not have access',
                //       code: status.UNAUTHORIZED
                //     });
                //   }
                // }
                next();
                return [2 /*return*/];
            });
        }); };
        this.jwtDecoder = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var authz, decoded, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        authz = req.headers.authorization;
                        if (!authz) {
                            return [2 /*return*/, next()];
                        }
                        decoded = jwt.decode(authz, this.JWT_SECRET);
                        if (!decoded || !decoded.valid) {
                            throw new StandardError({
                                message: 'Invalid Token',
                                code: status.BAD_REQUEST,
                            });
                        }
                        return [4 /*yield*/, db_1.User.findById(decoded.id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new StandardError({
                                message: 'Invalid Token',
                                code: status.BAD_REQUEST,
                            });
                        }
                        req.user = user;
                        req.token = decoded;
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.requireSuperAdmin = function (req, res, next) {
            if (!req.user) {
                throw new StandardError({
                    message: 'Super Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            if (!req.user.isSuperAdmin) {
                throw new StandardError({
                    message: 'Super Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            next();
        };
        this.requireAdmin = function (req, res, next) {
            if (!req.user) {
                throw new StandardError({
                    message: 'Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            if (!req.user.isAdmin) {
                throw new StandardError({
                    message: 'Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            next();
        };
        this.requireAdminOrModerator = function (req, res, next) {
            if (!req.user) {
                throw new StandardError({
                    message: 'Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            else if (req.user.roles === 'User') {
                throw new StandardError({
                    message: 'Admin authorization required',
                    code: status.FORBIDDEN,
                });
            }
            else if (req.user.roles === 'Super Admin' ||
                req.user.roles === 'Moderator' ||
                req.user.roles === 'Admin')
                // {
                //   next();
                // }
                next();
        };
        this.JWT_SECRET = config_1.config.JWT_SECRET || 'i am a tea pot';
    }
    return Middleware;
}());
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map