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
exports.EmailService = void 0;
var sgMail = require('@sendgrid/mail');
var config_1 = require("../config");
var EmailService = /** @class */ (function () {
    function EmailService() {
        var _this = this;
        this.testEmail = config_1.config.SENDGRID_TEST_EMAIL;
        this.environment = 'production';
        this.contactFormSubmission = function (_a) {
            var name = _a.name, email = _a.email, message = _a.message;
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: config_1.config.SENDGRID_USER_EMAIL,
                subject: name + " Contact Form Submission",
                text: "\n      Name: " + name + ",\n      Email: " + email + ",\n      Message: " + message + "\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.sendPWResetEmail = function (email, link) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: email,
                subject: 'Reset Password',
                html: link,
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.sendEmail = function (_a) {
            var subject = _a.subject, email = _a.email, data = _a.data;
            return __awaiter(_this, void 0, void 0, function () {
                var mailOptions;
                return __generator(this, function (_b) {
                    mailOptions = {
                        from: config_1.config.SENDGRID_USER_EMAIL,
                        to: email,
                        subject: subject,
                        text: data,
                    };
                    try {
                        return [2 /*return*/, this.sendgridEmail(mailOptions)];
                    }
                    catch (error) {
                        console.log(error.response.body, 'Email Error');
                    }
                    return [2 /*return*/];
                });
            });
        };
        this.sendgridTemplate = function (_a) {
            var data = _a.data, client = _a.client;
            return __awaiter(_this, void 0, void 0, function () {
                var clientFullName, adminMailRestaurantOptions, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            clientFullName = client.fullName
                                ? client.fullName.toUpperCase()
                                : ' User';
                            adminMailRestaurantOptions = {
                                from: "" + this.supportEmail,
                                to: "" + client.email,
                                templateId: this.sendgridTemplateID,
                                dynamic_template_data: { data: data },
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, sgMail.send(adminMailRestaurantOptions)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            console.log(e_1.response.body, 'Email Error');
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.newSubscriptionEmail = function (userDetails) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: userDetails.email,
                subject: " Welcome",
                text: "\n      Hey " + userDetails.fullName + ",\n      Thanks for joining.\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.subscriptionRenewalSuccessEmail = function (userDetails) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: userDetails.email,
                subject: userDetails.fullName + " renewal Success",
                text: "\n      Hey " + userDetails.fullName + ",\n      Your  subscription is renewed.\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.subscriptionRenewalFailedEmail = function (userDetails) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: userDetails.email,
                subject: userDetails.fullName + " Welcome",
                text: "\n      Hey " + userDetails.fullName + ",\n      We were not able to renew your subscription. Please manually renew it.\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.sendCancellationEmail = function (userDetails) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: userDetails.email,
                subject: userDetails.fullName + "  Subscription cancelled!",
                text: "\n      Hey " + userDetails.fullName + ",\n      We have successfully cancelled you renewal .\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.inviteUserEmail = function (details) {
            console.log('details:', details.link);
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: details.email,
                subject: details.email + " Welcome",
                html: "\n      <p>Hey " + details.email + ",</p>\n      <p>You've been invited to sign up on Byldd's boilerplate.</p>\n      <p>Please click <a href=\"" + details.link + "\"\">here</a></p>\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.refundEmail = function (details) {
            var mailOptions = {
                from: config_1.config.SENDGRID_USER_EMAIL,
                to: details.email,
                subject: "Refund",
                html: "\n      <p>Hey " + details.email + ",</p>\n      <p>Refund of amount " + details.currency + " " + details.amount + " has been initiated with the status of " + details.status + ".</p>\n      ",
            };
            return _this.sendgridEmail(mailOptions);
        };
        this.sendgridEmail = function (mailOptions) {
            if (config_1.config.NODE_ENV !== _this.environment) {
                mailOptions.to = _this.testEmail;
            }
            return sgMail.send(mailOptions);
        };
        sgMail.setApiKey(config_1.config.SENDGRID_API_KEY);
    }
    return EmailService;
}());
exports.EmailService = EmailService;
//# sourceMappingURL=email.js.map