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
exports.AuthRoutes = void 0;
var status = require("http-status");
var StandardError = require("standard-error");
var jwt = require("jwt-simple");
var jsonwt = require("jsonwebtoken");
var email_1 = require("../../services/email");
var validator_1 = require("validator");
// Import config
var config_1 = require("../../config");
// Internal Dependencies
var db_1 = require("../../db");
// Helpers
var helpers_1 = require("./helpers");
// Fiebase admin service
var firebaseAdmin_1 = require("../../services/firebaseAdmin");
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
    }
    AuthRoutes.JWT_SECRET = config_1.config.JWT_SECRET || 'i am a tea pot';
    AuthRoutes.register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, oauth, name_1, isInvited, referralCode, existingUser, firebaseAuthUser, uid, companyId, createdCompany, referredBy, user, referralPoints, createReferralPromise, referrerRewardPromise, userRewardPromise, _b, referral, referrarReward, userReward, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    _a = req.body.user, email = _a.email, password = _a.password, oauth = _a.oauth, name_1 = _a.name, isInvited = _a.isInvited, referralCode = _a.referralCode;
                    helpers_1.validateRegisterFields(req.body.user);
                    return [4 /*yield*/, db_1.User.findOne({ email: email })];
                case 1:
                    existingUser = _c.sent();
                    if (existingUser) {
                        throw new StandardError({
                            message: 'Email already in use',
                            code: status.CONFLICT,
                        });
                    }
                    return [4 /*yield*/, firebaseAdmin_1.firebaseService.createUser(name_1, email, password)];
                case 2:
                    firebaseAuthUser = _c.sent();
                    uid = firebaseAuthUser.uid;
                    companyId = void 0;
                    if (!!isInvited) return [3 /*break*/, 4];
                    return [4 /*yield*/, db_1.Company.create({ name: email })];
                case 3:
                    createdCompany = _c.sent();
                    companyId = createdCompany._id;
                    _c.label = 4;
                case 4:
                    referredBy = void 0;
                    if (!referralCode) return [3 /*break*/, 6];
                    return [4 /*yield*/, db_1.User.findOne({
                            referralCode: referralCode,
                        })];
                case 5:
                    referredBy = _c.sent();
                    _c.label = 6;
                case 6: return [4 /*yield*/, db_1.User.create({
                        email: email,
                        firebaseUid: uid,
                        name: name_1,
                        oauth: oauth,
                        hasPassword: true,
                        companyId: companyId,
                        referredBy: referredBy ? referredBy._id : null,
                    })];
                case 7:
                    user = _c.sent();
                    if (!!isInvited) return [3 /*break*/, 9];
                    return [4 /*yield*/, db_1.Company.findByIdAndUpdate(companyId, { userId: user._id })];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    if (!referralCode) return [3 /*break*/, 11];
                    referralPoints = 10;
                    createReferralPromise = db_1.Referrals.create({
                        referredByRef: referredBy._id,
                        referredToRef: user._id,
                        points: referralPoints,
                        referralActive: true,
                        type: 'SIGN_UP',
                    });
                    referrerRewardPromise = helpers_1.giveReferralRewards(referredBy._id, referralPoints);
                    userRewardPromise = helpers_1.giveReferralRewards(user._id, referralPoints);
                    return [4 /*yield*/, Promise.all([
                            createReferralPromise,
                            referrerRewardPromise,
                            userRewardPromise,
                        ])];
                case 10:
                    _b = _c.sent(), referral = _b[0], referrarReward = _b[1], userReward = _b[2];
                    user = userReward; // assigning the reward to the user.
                    _c.label = 11;
                case 11:
                    res.locals.code = status.OK;
                    res.locals.res_obj = {
                        token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET),
                        user: user,
                    };
                    return [2 /*return*/, next()];
                case 12:
                    error_1 = _c.sent();
                    next(error_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.registerLoginOauth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, oauth, name_2, accessToken, firebaseUid, isInvited, user, message, companyId, createdCompany, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    _a = req.body.user, email = _a.email, oauth = _a.oauth, name_2 = _a.name, accessToken = _a.accessToken, firebaseUid = _a.firebaseUid, isInvited = _a.isInvited;
                    return [4 /*yield*/, helpers_1.verifySocialLoginRegister(req.body.user)];
                case 1:
                    _b.sent();
                    if (!email) {
                        throw new StandardError({
                            message: 'Email is required',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (!validator_1.default.isEmail(email)) {
                        throw new StandardError({
                            message: 'Invalid email',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.User.findOne({ email: email })];
                case 2:
                    user = _b.sent();
                    message = void 0;
                    if (!user) return [3 /*break*/, 3];
                    message = 'Logged In';
                    return [3 /*break*/, 9];
                case 3:
                    companyId = void 0;
                    if (!!isInvited) return [3 /*break*/, 5];
                    return [4 /*yield*/, db_1.Company.create({ name: email })];
                case 4:
                    createdCompany = _b.sent();
                    companyId = createdCompany._id;
                    _b.label = 5;
                case 5: return [4 /*yield*/, db_1.User.create({
                        email: email,
                        oauth: oauth,
                        name: name_2,
                        firebaseUid: firebaseUid,
                        companyId: companyId,
                    })];
                case 6:
                    user = _b.sent();
                    if (!!isInvited) return [3 /*break*/, 8];
                    return [4 /*yield*/, db_1.Company.findByIdAndUpdate(companyId, { userId: user._id })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    message = 'Registered Successfully';
                    _b.label = 9;
                case 9:
                    res.locals.code = status.OK;
                    res.locals.res_obj = {
                        token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET),
                        user: user,
                        message: message,
                    };
                    return [2 /*return*/, next()];
                case 10:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, firebaseUser, user, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body.user, email = _a.email, password = _a.password;
                    if (!email || !password) {
                        throw new StandardError({
                            message: 'Email and Password are requried',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, firebaseAdmin_1.firebaseService.signInUser(email, password)];
                case 1:
                    firebaseUser = (_b.sent()).user.toJSON();
                    return [4 /*yield*/, db_1.User.findOne({ firebaseUid: firebaseUser.uid })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        throw new StandardError({
                            message: 'Invalid email or password',
                            code: status.CONFLICT,
                        });
                    }
                    res.locals.code = status.OK;
                    res.locals.res_obj = {
                        token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET),
                        user: user,
                    };
                    return [2 /*return*/, next()];
                case 3:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.sendResetEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, email, user, host, link, token, callbackUrl, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    emailService = new email_1.EmailService();
                    email = req.body.email;
                    if (!email) {
                        throw new StandardError({
                            message: 'Email is requried ',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.User.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new StandardError({
                            message: 'Invalid email ',
                            code: status.CONFLICT,
                        });
                    }
                    host = req.protocol + "://" + config_1.config.HOST;
                    link = host + "/api/auth/reset-password/";
                    token = jsonwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, email_id: email }, AuthRoutes.JWT_SECRET);
                    callbackUrl = "<p>Click <a href='" + link + token + "'>here</a> to reset your password</p>";
                    return [4 /*yield*/, emailService.sendPWResetEmail(email, callbackUrl)];
                case 2:
                    result = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = result;
                    return [2 /*return*/, next()];
                case 3:
                    error_4 = _a.sent();
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.resetPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var host, token, decoded, email, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    host = req.protocol + "://" + config_1.config.HOST;
                    token = req.params.token;
                    return [4 /*yield*/, jsonwt.verify(token, AuthRoutes.JWT_SECRET)];
                case 1:
                    decoded = _a.sent();
                    if (decoded) {
                        email = decoded.email_id;
                        res.redirect(301, host + "/reset?email=" + email + "&token=" + token);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.updatePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, token, decoded, decodedemail, existingUser, user, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    _a = req.body.data, email = _a.email, password = _a.password, token = _a.token;
                    if (!email) {
                        throw new StandardError({
                            message: 'Email is required',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (!password) {
                        throw new StandardError({
                            message: 'Password is required',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    else if (!validator_1.default.isStrongPassword(password)) {
                        throw new StandardError({
                            message: 'Password must contain at least 8 characters, including upper and lowercase characters, a number and a special character.',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, jsonwt.verify(token, AuthRoutes.JWT_SECRET)];
                case 1:
                    decoded = _b.sent();
                    if (!decoded) return [3 /*break*/, 7];
                    decodedemail = decoded.email_id;
                    if (!(decodedemail === email)) return [3 /*break*/, 5];
                    return [4 /*yield*/, db_1.User.findOne({ email: email })];
                case 2:
                    existingUser = _b.sent();
                    if (!existingUser) {
                        throw new StandardError({
                            message: 'Email is not registerd',
                            code: status.CONFLICT,
                        });
                    }
                    return [4 /*yield*/, firebaseAdmin_1.firebaseService.updateUserPassword(existingUser.firebaseUid, password)];
                case 3:
                    user = _b.sent();
                    return [4 /*yield*/, db_1.User.update({ email: email }, { hasPassword: true })];
                case 4:
                    _b.sent();
                    if (user) {
                        res.locals.code = status.OK;
                        res.locals.res_obj = existingUser;
                        return [2 /*return*/, next()];
                    }
                    return [3 /*break*/, 6];
                case 5: throw new StandardError({
                    message: 'Email is not valid',
                    code: status.CONFLICT,
                });
                case 6: return [3 /*break*/, 8];
                case 7: throw new StandardError({
                    message: 'Email is not found',
                    code: status.CONFLICT,
                });
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_6 = _b.sent();
                    next(error_6);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, currentPassword, newPassword, match, user, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.body.passwordDetails, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                    return [4 /*yield*/, firebaseAdmin_1.firebaseService.signInUser(req.user.email, currentPassword)];
                case 1:
                    match = _b.sent();
                    if (!match) {
                        throw new StandardError({
                            message: 'Invalid password',
                            code: status.CONFLICT,
                        });
                    }
                    if (!!validator_1.default.isStrongPassword(newPassword)) return [3 /*break*/, 2];
                    throw new StandardError({
                        message: 'Password must contain at least 8 characters, including upper and lowercase characters, a number and a special character.',
                        code: status.UNPROCESSABLE_ENTITY,
                    });
                case 2: return [4 /*yield*/, firebaseAdmin_1.firebaseService.updateUserPassword(req.user.firebaseUid, newPassword)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, db_1.User.findById(req.user._id)];
                case 4:
                    user = _b.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = {
                        token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET),
                        user: user,
                    };
                    return [2 /*return*/, next()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_7 = _b.sent();
                    next(error_7);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.me = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                if (!req.user) {
                    res.locals.code = status.UNAUTHORIZED;
                }
                else {
                    res.locals.code = status.OK;
                    res.locals.res_obj = req.user;
                }
                return [2 /*return*/, next()];
            }
            catch (error) {
                next(error);
            }
            return [2 /*return*/];
        });
    }); };
    AuthRoutes.unsubscribe = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, db_1.User.findByIdAndUpdate(id, {
                            subscribedToNewsletter: false,
                        })];
                case 1:
                    user = _a.sent();
                    res.locals.code = status.OK;
                    res.locals.res_obj = user;
                    return [2 /*return*/, next()];
                case 2:
                    error_8 = _a.sent();
                    next(error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthRoutes.deleteFirebaseUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var uid, data;
        return __generator(this, function (_a) {
            try {
                uid = req.params.uid;
                data = firebaseAdmin_1.firebaseService.deleteUser(uid);
                res.locals.code = status.OK;
                res.locals.res_obj = data;
                return [2 /*return*/, next()];
            }
            catch (error) {
                next(error);
            }
            return [2 /*return*/];
        });
    }); };
    AuthRoutes.registerInviteUser = function (document) { return __awaiter(void 0, void 0, void 0, function () {
        var email, password, oauth, name, companyId, role, existingUser, firebaseAuthUser, uid, user, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = document.email, password = document.password, oauth = document.oauth, name = document.name, companyId = document.companyId;
                    helpers_1.validateRegisterFields(document);
                    role = 'Moderator';
                    return [4 /*yield*/, db_1.User.findOne({ email: email })];
                case 1:
                    existingUser = _a.sent();
                    if (existingUser) {
                        throw new StandardError({
                            message: 'Email already in use',
                            code: status.CONFLICT,
                        });
                    }
                    return [4 /*yield*/, firebaseAdmin_1.firebaseService.createUser(name, email, password)];
                case 2:
                    firebaseAuthUser = _a.sent();
                    uid = firebaseAuthUser.uid;
                    return [4 /*yield*/, db_1.User.create({
                            email: email,
                            firebaseUid: uid,
                            name: name,
                            oauth: oauth,
                            hasPassword: true,
                            companyId: companyId,
                            roles: role,
                        })];
                case 3:
                    user = _a.sent();
                    data = {
                        token: jwt.encode(helpers_1.getJwtPayload(user), AuthRoutes.JWT_SECRET),
                        user: user,
                    };
                    return [2 /*return*/, data];
            }
        });
    }); };
    return AuthRoutes;
}());
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=routes.js.map