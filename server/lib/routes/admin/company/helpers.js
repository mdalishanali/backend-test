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
exports.CompanyHelpers = void 0;
var status = require("http-status");
var db_1 = require("../../../db");
var StandardError = require("standard-error");
var config_1 = require("../../../config");
var mongoose = require("mongoose");
var email_1 = require("../../../services/email");
var jwt = require("jsonwebtoken");
var ObjectId = mongoose.Types.ObjectId;
var JWT_SECRET = config_1.config.JWT_SECRET ? config_1.config.JWT_SECRET : 'i am a tea pot';
var createInviteMailData = function (email, protocol) {
    var host = protocol + "://" + config_1.config.HOST;
    var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email }, JWT_SECRET);
    var link = host + "/api/accept-invite/invite/?inviteToken=" + token;
    var mailData = {
        email: email,
        link: link,
    };
    return mailData;
};
var CompanyHelpers = /** @class */ (function () {
    function CompanyHelpers() {
    }
    CompanyHelpers.getCompanies = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, filter, andQuery, matchObj, dateQuery, sortingQuery, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = Number(query.page) || 1;
                    limit = Number(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    filter = query.filter;
                    andQuery = [];
                    matchObj = {};
                    if (Boolean(searchValue)) {
                        matchObj.$text = { $search: searchValue };
                    }
                    if (filter === null || filter === void 0 ? void 0 : filter.date) {
                        dateQuery = {
                            createdAt: {}
                        };
                        if (filter === null || filter === void 0 ? void 0 : filter.date.from) {
                            dateQuery.createdAt['$gte'] = new Date(filter.date.from);
                        }
                        if (filter === null || filter === void 0 ? void 0 : filter.date.to) {
                            dateQuery.createdAt['$lte'] = new Date(filter.date.to);
                        }
                        andQuery.push(dateQuery);
                    }
                    if (andQuery.length) {
                        matchObj.$and = andQuery;
                    }
                    sortingQuery = {
                        $sort: {
                            createdAt: -1
                        }
                    };
                    return [4 /*yield*/, db_1.Company.aggregate([
                            {
                                $match: matchObj
                            },
                            sortingQuery,
                            {
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
                            },
                        ])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    CompanyHelpers.getCompanyUsers = function (companyId, query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, matchObj, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = Number(query.page) || 1;
                    limit = Number(query.pageSize) || 50;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    matchObj = { companyId: ObjectId(companyId) };
                    if (Boolean(searchValue)) {
                        matchObj.$text = { $search: searchValue };
                    }
                    return [4 /*yield*/, db_1.User.aggregate([
                            {
                                $match: matchObj
                            },
                            {
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
                            },
                        ])];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    CompanyHelpers.getCompanyInviteDetails = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var pendingInvites, expiredInvites;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.InvitedUsers.find({
                        companyId: companyId,
                        isAccepted: false,
                        cancelled: false,
                        expiry: { $gt: Date.now() }
                    })];
                case 1:
                    pendingInvites = _a.sent();
                    return [4 /*yield*/, db_1.InvitedUsers.find({
                            companyId: companyId,
                            isAccepted: false,
                            $or: [
                                { expiry: { $lt: Date.now() } },
                                { cancelled: true }
                            ]
                        })];
                case 2:
                    expiredInvites = _a.sent();
                    return [2 /*return*/, { pendingInvites: pendingInvites, expiredInvites: expiredInvites }];
            }
        });
    }); };
    CompanyHelpers.updateCompany = function (id, update) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Company.findByIdAndUpdate(id, update, { new: true })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    CompanyHelpers.getCompanyDetails = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.Company.findById(id)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    CompanyHelpers.changeUserRole = function (userId, companyId, roles) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.User.updateOne({ _id: userId, companyId: companyId }, { roles: roles }, { new: true })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    CompanyHelpers.cancelInvite = function (inviteId, companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            _id: inviteId,
                            companyId: companyId
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
    CompanyHelpers.resendInvitation = function (email, companyId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
        var emailService, existingInvitation, data, mailData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailService = new email_1.EmailService();
                    return [4 /*yield*/, db_1.InvitedUsers.findOne({
                            invitedEmail: email,
                            companyId: companyId
                        })];
                case 1:
                    existingInvitation = _a.sent();
                    if (!existingInvitation) return [3 /*break*/, 3];
                    return [4 /*yield*/, db_1.InvitedUsers.updateOne({ invitedEmail: email }, { expiry: new Date(Date.now() + 1 * (60 * 60 * 1000)), cancelled: false })];
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
    CompanyHelpers.inviteUsers = function (emails, companyId, userId, protocol) { return __awaiter(void 0, void 0, void 0, function () {
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
                                                invitedEmail: emailObj.email
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
                                            role: emailObj.role
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
                            message: "Mail with invite sent successfully " + (alreadyInvitedEmails.length > 0 ? "except for " + alreadyInvitedEmails.toString() + " as they are already invited" : ''),
                        }];
            }
        });
    }); };
    return CompanyHelpers;
}());
exports.CompanyHelpers = CompanyHelpers;
//# sourceMappingURL=helpers.js.map