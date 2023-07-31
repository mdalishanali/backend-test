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
exports.InviteUsersHelpers = exports.addCompanyInAUser = void 0;
var jwt = require("jsonwebtoken");
var status = require("http-status");
var db_1 = require("../../db");
var email_1 = require("../../services/email");
var StandardError = require("standard-error");
var moment = require("moment");
var config_1 = require("../../config");
var JWT_SECRET = config_1.config.JWT_SECRET
    ? config_1.config.JWT_SECRET
    : 'i am a tea pot';
var createInviteMailData = function (email, protocol) {
    var host = protocol + "://" + config_1.config.HOST;
    var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, email: email }, JWT_SECRET);
    var link = host + "/api/accept-invite/invite/?inviteToken=" + token;
    var mailData = {
        email: email,
        link: link,
    };
    return mailData;
};
var addCompanyInAUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var createdCompany;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!Boolean(user.companyId)) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1.Company.create({
                        name: user.email,
                        userId: user._id,
                    })];
            case 1:
                createdCompany = _a.sent();
                return [4 /*yield*/, db_1.User.updateOne({ _id: user._id }, { companyId: createdCompany._id })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addCompanyInAUser = addCompanyInAUser;
var InviteUsersHelpers = /** @class */ (function () {
    function InviteUsersHelpers() {
    }
    InviteUsersHelpers.cancelInvite = function (inviteId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            _id: inviteId,
                            companyId: companyId,
                        })];
                case 1:
                    existingInvitation = _a.sent();
                    if (!existingInvitation) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.InvitedUsers.updateOne({ _id: inviteId }, { cancelled: true })];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, {
                            message: "Invitation cancelled successfully",
                        }];
                case 3: throw new StandardError({
                    message: "Invalid invite",
                    code: status.CONFLICT,
                });
            }
        });
    }); };
    InviteUsersHelpers.resendInvitation = function (email, companyId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data, mailData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            invitedEmail: email,
                            companyId: companyId,
                        })];
                case 1:
                    existingInvitation = _a.sent();
                    if (!existingInvitation) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.InvitedUsers.updateOne({ invitedEmail: email }, {
                            expiry: new Date(Date.now() + 1 * (60 * 60 * 1000)),
                            cancelled: false,
                        })];
                case 2:
                    data = _a.sent();
                    mailData = createInviteMailData(email, protocol);
                    emailService.inviteUserEmail(mailData);
                    return [2 /*return*/, {
                            message: "Invitation email re-sent successfully to " + email,
                        }];
                case 3: throw new StandardError({
                    message: email + " is not invited",
                    code: status.CONFLICT,
                });
            }
        });
    }); };
    InviteUsersHelpers.inviteUsers = function (emails, companyId, userId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, asyncFilter, alreadyInvited, alreadyInvitedEmails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    asyncFilter = function (emailsList, predicate) { return __awaiter(void 0, void 0, void 0, function () {
                        var results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(emailsList.map(predicate))];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, emailsList.filter(function (_v, index) { return results[index]; })];
                            }
                        });
                    }); };
                    return [4 /*yield*/, asyncFilter(emails, function (emailObj) { return __awaiter(void 0, void 0, void 0, function () {
                            var isInvited, existingInvitation, inviation, data, mailData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        isInvited = false;
                                        return [4 /*yield*/, db_1.InvitedUsers.findOne({
                                                invitedEmail: emailObj.email,
                                            })];
                                    case 1:
                                        existingInvitation = _a.sent();
                                        if (!existingInvitation) return [3 /*break*/, 2];
                                        isInvited = true;
                                        return [3 /*break*/, 4];
                                    case 2:
                                        inviation = {
                                            invitedEmail: emailObj.email,
                                            companyId: companyId,
                                            userId: userId,
                                            role: emailObj.role,
                                        };
                                        return [4 /*yield*/, db_1.InvitedUsers.create(inviation)];
                                    case 3:
                                        data = _a.sent();
                                        mailData = createInviteMailData(emailObj.email, protocol);
                                        emailService.inviteUserEmail(mailData);
                                        _a.label = 4;
                                    case 4:
                                        if (isInvited) {
                                            return [2 /*return*/, true];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    alreadyInvited = _a.sent();
                    alreadyInvitedEmails = alreadyInvited.map(function (item) {
                        return item.email;
                    });
                    return [2 /*return*/, {
                            message: "Mail with invite sent successfully " + (alreadyInvitedEmails.length > 0
                                ? "except for " + alreadyInvitedEmails.toString() + " as they are already invited"
                                : ''),
                        }];
            }
        });
    }); };
    InviteUsersHelpers.invitedUsers = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var pendingInvites, expiredInvites, acceptedInvites;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.InvitedUsers.find({
                        companyId: companyId._id,
                        isAccepted: false,
                        cancelled: false,
                        expiry: { $gt: Date.now() },
                    })];
                case 1:
                    pendingInvites = _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.find({
                            companyId: companyId._id,
                            isAccepted: false,
                            $or: [{ expiry: { $lt: Date.now() } }, { cancelled: true }],
                        })];
                case 2:
                    expiredInvites = _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.aggregate([
                            {
                                $match: {
                                    isAccepted: true,
                                    companyId: companyId._id,
                                },
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { companyIds: '$companyId', email: '$invitedEmail' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $and: [
                                                    { $expr: { $eq: ['$companyId', '$$companyIds'] } },
                                                    { $expr: { $eq: ['$email', '$$email'] } },
                                                ],
                                            },
                                        },
                                        {
                                            $project: {
                                                _id: 1,
                                                name: 1,
                                                email: 1,
                                            },
                                        },
                                    ],
                                    as: 'userInfo',
                                },
                            },
                            {
                                $unwind: '$userInfo',
                            },
                        ])];
                case 3:
                    acceptedInvites = _a.sent();
                    return [2 /*return*/, { pendingInvites: pendingInvites, acceptedInvites: acceptedInvites, expiredInvites: expiredInvites }];
            }
        });
    }); };
    InviteUsersHelpers.acceptInvite = function (inviteToken, userEmail) { return __awaiter(void 0, void 0, void 0, function () {
        var decoded, user, invite, referredBy, inviter, isInviterSuperAdmin, newCompanyId, createdCompany;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, jwt.verify(inviteToken, JWT_SECRET)];
                case 1:
                    decoded = _a.sent();
                    if (!decoded) {
                        throw new StandardError({
                            message: 'Invalid or expired invie token',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (decoded.email !== userEmail) {
                        throw new StandardError({
                            message: "this invitation does not belong to '" + userEmail + "'.",
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.User.findOne({ email: userEmail })];
                case 2:
                    user = _a.sent();
                    if (!Boolean(user)) {
                        throw new StandardError({
                            message: 'Email not registered',
                            code: status.UNAUTHORIZED,
                        });
                    }
                    if (Boolean(user.referredBy)) {
                        throw new StandardError({
                            message: 'You have accepted one invitation already',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            invitedEmail: userEmail,
                        })];
                case 3:
                    invite = _a.sent();
                    if (!!Boolean(invite)) return [3 /*break*/, 5];
                    return [4 /*yield*/, exports.addCompanyInAUser(user)];
                case 4:
                    _a.sent();
                    throw new StandardError({
                        message: "You email '" + userEmail + "' is not invited.",
                        code: status.UNPROCESSABLE_ENTITY,
                    });
                case 5:
                    if (!moment(invite.expiry).isBefore(Date.now())) return [3 /*break*/, 7];
                    return [4 /*yield*/, exports.addCompanyInAUser(user)];
                case 6:
                    _a.sent();
                    throw new StandardError({
                        message: 'Invitation is expired',
                        code: status.UNPROCESSABLE_ENTITY,
                    });
                case 7:
                    if (!(invite.cancelled === true)) return [3 /*break*/, 9];
                    return [4 /*yield*/, exports.addCompanyInAUser(user)];
                case 8:
                    _a.sent();
                    throw new StandardError({
                        message: 'Invitation is cancelled',
                        code: status.UNPROCESSABLE_ENTITY,
                    });
                case 9:
                    referredBy = invite.userId;
                    return [4 /*yield*/, db_1.User.findById(invite.userId).lean()];
                case 10:
                    inviter = _a.sent();
                    isInviterSuperAdmin = false;
                    newCompanyId = '';
                    if (!(!Boolean(invite.companyId) && inviter.roles === 'Super Admin')) return [3 /*break*/, 12];
                    isInviterSuperAdmin = true;
                    return [4 /*yield*/, db_1.Company.create({
                            name: userEmail,
                            userId: user._id,
                        })];
                case 11:
                    createdCompany = _a.sent();
                    newCompanyId = createdCompany._id;
                    _a.label = 12;
                case 12: return [4 /*yield*/, db_1.User.updateOne({ _id: user._id }, {
                        referredBy: referredBy,
                        roles: invite.role,
                        companyId: isInviterSuperAdmin ? newCompanyId : invite.companyId,
                    }, { new: true })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.updateOne({ _id: invite._id }, { isAccepted: true }, { new: true })];
                case 14:
                    _a.sent();
                    return [2 /*return*/, { message: 'Invitation accepted successfully' }];
            }
        });
    }); };
    InviteUsersHelpers.acceptSingleUser = function (document, inviteToken) { return __awaiter(void 0, void 0, void 0, function () {
        var decoded, user, invite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decoded = jwt.verify(inviteToken, JWT_SECRET);
                    if (!decoded) {
                        throw new StandardError({
                            message: 'Invalid or expired invite token',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (decoded.email !== document.email) {
                        throw new StandardError({
                            message: "This invitation does not belong to '" + document.email + "'.",
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.User.findOne({ email: document.email })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new StandardError({
                            message: 'You have accepted one invitation already',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            invitedEmail: document.email,
                        })];
                case 2:
                    invite = _a.sent();
                    if (!invite) {
                        throw new StandardError({
                            message: "You email '" + document.email + "' is not invited.",
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (moment(invite.expiry).isBefore(Date.now())) {
                        throw new StandardError({
                            message: 'Invitation is expired',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    if (invite.cancelled) {
                        throw new StandardError({
                            message: 'Invitation is cancelled',
                            code: status.UNPROCESSABLE_ENTITY,
                        });
                    }
                    // const referredBy = invite.userId;
                    // const inviter = await User.findById(invite.userId).lean();
                    document.companyId = invite.companyId._id;
                    console.log('document:invite', document);
                    return [4 /*yield*/, db_1.InvitedUsers.updateOne({ _id: invite._id }, { isAccepted: true }, { new: true })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return InviteUsersHelpers;
}());
exports.InviteUsersHelpers = InviteUsersHelpers;
//# sourceMappingURL=helpers.js.map