"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var AwsRouter = /** @class */ (function () {
    function AwsRouter() {
        this.router = express.Router();
        this.router.get('/get-aws-url', routes_1.AwsRoutes.getPreSignedUrl);
    }
    return AwsRouter;
}());
exports.AwsRouter = AwsRouter;
//# sourceMappingURL=index.js.map