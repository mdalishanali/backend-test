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
exports.ChatRoutes = void 0;
var status = require("http-status");
var index_1 = require("./../../db/index");
var mongoose = require("mongoose");
var ChatRoutes = /** @class */ (function () {
    function ChatRoutes() {
    }
    ChatRoutes.searchUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var queryValue, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    queryValue = req.query.email;
                    return [4 /*yield*/, index_1.User.aggregate([
                            {
                                $match: {
                                    email: queryValue
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    name: 1,
                                    email: 1
                                }
                            }
                        ])];
                case 1:
                    users = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = { users: users };
                    return [2 /*return*/, next()];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    ChatRoutes.addUserDataToQuery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var usersList, userId_1, newList, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersList = req.body.users;
                    userId_1 = req.user._id;
                    return [4 /*yield*/, Promise.all(usersList.map(function (element) { return __awaiter(void 0, void 0, void 0, function () {
                            var chatUsers, differentUserInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        chatUsers = Object.keys(element.users);
                                        chatUsers.splice(chatUsers.indexOf(userId_1.toString()), 1);
                                        return [4 /*yield*/, index_1.User.aggregate([
                                                {
                                                    $match: {
                                                        _id: mongoose.Types.ObjectId(chatUsers[0])
                                                    }
                                                },
                                                {
                                                    $project: {
                                                        name: 1,
                                                        _id: 0
                                                    }
                                                }
                                            ])];
                                    case 1:
                                        differentUserInfo = _a.sent();
                                        element.differentUser = differentUserInfo[0];
                                        return [2 /*return*/, element];
                                }
                            });
                        }); }))];
                case 1:
                    newList = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = newList;
                    return [2 /*return*/, next()];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return ChatRoutes;
}());
exports.ChatRoutes = ChatRoutes;
//# sourceMappingURL=routes.js.map