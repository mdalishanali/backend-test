"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var ReferralRouter = /** @class */ (function () {
    function ReferralRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router.get('/', routes_1.ReferralRoutes.getAllReferrals);
    }
    return ReferralRouter;
}());
exports.ReferralRouter = ReferralRouter;
//# sourceMappingURL=index.js.map