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
exports.ErrorLogServices = void 0;
var status = require("http-status");
var winston = require("winston");
var CloudWatchTransport = require("winston-aws-cloudwatch");
var config_1 = require("../config");
var logHelpers_1 = require("./logHelpers");
var fetch = require("node-fetch");
var environment = 'production';
var ErrorLogService = /** @class */ (function () {
    function ErrorLogService() {
        var _this = this;
        this.errorLog = function (err, req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var isErrorSevere, errorBody, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!err.code) {
                            err.code = 500;
                        }
                        isErrorSevere = this.checkErrorSeverity(err);
                        errorBody = {
                            level: 'error',
                            message: err.message,
                            statusCode: err.code,
                            stackTrace: err,
                            endpoint: req.path,
                            user: req.user ? req.user._id : '',
                            request: {
                                body: logHelpers_1.maskJsonData(req.body),
                                query: logHelpers_1.maskJsonData(req.query),
                                params: logHelpers_1.maskJsonData(req.params)
                            },
                            response: err,
                        };
                        if (!(config_1.config.NODE_ENV !== environment)) return [3 /*break*/, 3];
                        if (!isErrorSevere) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.notifyOverSlack(errorBody)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.logger.log(errorBody);
                        _a.label = 3;
                    case 3:
                        res.status(err.code || status.INTERNAL_SERVER_ERROR).send(err);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        res.status(status.INTERNAL_SERVER_ERROR).send(err);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.checkErrorSeverity = function (err) {
            var isErrorSevere = false;
            if (err.code >= 500) {
                isErrorSevere = true;
            }
            return isErrorSevere;
        };
        this.notifyOverSlack = function (body) { return __awaiter(_this, void 0, void 0, function () {
            var messageBody, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messageBody = {
                            blocks: [
                                {
                                    type: 'rich_text',
                                    elements: [
                                        {
                                            type: 'rich_text_preformatted',
                                            border: 0,
                                            elements: [
                                                {
                                                    type: 'text',
                                                    text: JSON.stringify(body, undefined, 4)
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        };
                        return [4 /*yield*/, fetch("" + config_1.config.SLACK_WEBHOOK_FOR_LOGS, {
                                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(messageBody)
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        if (config_1.config.NODE_ENV !== environment) {
            this.logger = winston.createLogger({
                transports: [
                    new CloudWatchTransport({
                        logGroupName: config_1.config.AWS_LOG_GROUP_NAME,
                        logStreamName: config_1.config.NODE_ENV,
                        createLogGroup: true,
                        createLogStream: true,
                        submissionInterval: 2000,
                        submissionRetryCount: 1,
                        batchSize: 20,
                        awsConfig: {
                            accessKeyId: config_1.config.S3_USER_KEY,
                            secretAccessKey: config_1.config.S3_USER_SECRET,
                            region: config_1.config.S3_BUCKET_REGION
                        },
                    })
                ]
            });
        }
    }
    return ErrorLogService;
}());
exports.ErrorLogServices = new ErrorLogService();
//# sourceMappingURL=error.log.js.map