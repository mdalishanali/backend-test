"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiLogServices = void 0;
var status = require("http-status");
var winston = require("winston");
var CloudWatchTransport = require("winston-aws-cloudwatch");
var config_1 = require("../config");
var logHelpers_1 = require("./logHelpers");
var environment = 'production';
var ApiLogService = /** @class */ (function () {
    function ApiLogService() {
        var _this = this;
        this.apiLog = function (req, res, next) {
            try {
                if (config_1.config.NODE_ENV !== environment) {
                    _this.logger.log({
                        level: 'info',
                        message: 'This request is successfull',
                        statusCode: res.locals.code,
                        request: {
                            body: logHelpers_1.maskJsonData(req.body),
                            query: logHelpers_1.maskJsonData(req.query),
                            params: logHelpers_1.maskJsonData(req.params)
                        },
                        response: logHelpers_1.maskJsonData(res.locals.res_obj),
                        endpoint: req.path,
                        user: req.user ? req.user._id : ''
                    });
                }
                res.status(res.locals.code || status.OK).json(res.locals.res_obj || {});
            }
            catch (error) {
                next(error);
            }
        };
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
    return ApiLogService;
}());
exports.ApiLogServices = new ApiLogService();
//# sourceMappingURL=api.log.js.map