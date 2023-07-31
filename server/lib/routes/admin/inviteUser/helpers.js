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
exports.InviteUsersHelpers = void 0;
var jwt = require("jsonwebtoken");
var status = require("http-status");
var db_1 = require("../../../db");
var email_1 = require("../../../services/email");
var StandardError = require("standard-error");
var config_1 = require("../../../config");
var JWT_SECRET = config_1.config.JWT_SECRET ? config_1.config.JWT_SECRET : 'i am a tea pot';
var createInviteMailData = function (email, protocol) {
    var host = protocol + "://" + config_1.config.HOST;
    var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60, email: email }, JWT_SECRET);
    var link = host + "/accept-invite/?inviteToken=" + token;
    var mailData = {
        email: email,
        link: link,
    };
    return mailData;
};
var InviteUsersHelpers = /** @class */ (function () {
    function InviteUsersHelpers() {
    }
    InviteUsersHelpers.cancelInvite = function (inviteId, userId) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            _id: inviteId,
                            userId: userId,
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
    InviteUsersHelpers.resendInvitation = function (email, userId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data, mailData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            invitedEmail: email,
                            userId: userId,
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
    InviteUsersHelpers.updateInvite = function (inviteId, update) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.InvitedUsers.updateOne({ _id: inviteId }, update, {
                        new: true,
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    InviteUsersHelpers.inviteUsers = function (emails, userId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
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
    InviteUsersHelpers.invitedUsers = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var pendingInvites, expiredInvites, acceptedInvites;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.InvitedUsers.find({
                        userId: userId,
                        isAccepted: false,
                        cancelled: false,
                        expiry: { $gt: Date.now() },
                        companyId: { $exists: false },
                    })];
                case 1:
                    pendingInvites = _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.find({
                            userId: userId,
                            isAccepted: false,
                            companyId: { $exists: false },
                            $or: [{ expiry: { $lt: Date.now() } }, { cancelled: true }],
                        })];
                case 2:
                    expiredInvites = _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.aggregate([
                            {
                                $match: {
                                    isAccepted: true,
                                    userId: userId,
                                    companyId: { $exists: false },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'users',
                                    let: { userId: '$userId', email: '$invitedEmail' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $and: [
                                                    { $expr: { $eq: ['$referredBy', '$$userId'] } },
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
    InviteUsersHelpers.inviteSingleUser = function (inviteUser, companyId, userId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
        var existingInvitation, companyIdUser, invitation, emailService, mailData, invitePromise, emailPromise, _a, data, email;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, db_1.InvitedUsers.findOne({
                        invitedEmail: inviteUser.email,
                    })];
                case 1:
                    existingInvitation = _b.sent();
                    if (existingInvitation) {
                        throw new StandardError({
                            message: "Already invited",
                            code: status.CONFLICT,
                        });
                    }
                    companyIdUser = companyId;
                    if (inviteUser.companyId) {
                        companyIdUser = inviteUser.companyId;
                    }
                    invitation = {
                        invitedEmail: inviteUser.email,
                        companyId: companyIdUser,
                        userId: userId,
                        role: 'Moderator',
                        permissions: inviteUser.permissions,
                    };
                    emailService = new email_1.EmailService();
                    mailData = createInviteMailData(inviteUser.email, protocol);
                    invitePromise = db_1.InvitedUsers.create(invitation);
                    emailPromise = emailService.inviteUserEmail(mailData);
                    return [4 /*yield*/, Promise.all([invitePromise, emailPromise])];
                case 2:
                    _a = _b.sent(), data = _a[0], email = _a[1];
                    return [2 /*return*/, data];
            }
        });
    }); };
    InviteUsersHelpers.findAllInvitedUser = function (query, user) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, filter, allFilter, matchQuery, paginationQuery, aggregatePipeline, searchQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = parseInt(query.page) || 1;
                    limit = parseInt(query.pageSize) || 15;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    filter = query.filter;
                    allFilter = {};
                    matchQuery = {
                        $match: allFilter,
                    };
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
                                    $count: 'count',
                                },
                            ],
                        },
                    };
                    aggregatePipeline = [matchQuery, paginationQuery];
                    if (searchValue.length) {
                        searchQuery = { $match: { $text: { $search: searchValue } } };
                        aggregatePipeline = __spreadArray([searchQuery], aggregatePipeline);
                    }
                    return [4 /*yield*/, db_1.InvitedUsers.aggregate(aggregatePipeline)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    return InviteUsersHelpers;
}());
exports.InviteUsersHelpers = InviteUsersHelpers;
//# sourceMappingURL=helpers.js.map