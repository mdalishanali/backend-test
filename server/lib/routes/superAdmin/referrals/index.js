"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminReferralsRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var SuperAdminReferralsRouter = /** @class */ (function () {
    function SuperAdminReferralsRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireSuperAdmin);
        this.router.get('/', routes_1.ReferralRoutes.getAllReferrals);
    }
    return SuperAdminReferralsRouter;
}());
exports.SuperAdminReferralsRouter = SuperAdminReferralsRouter;
//# sourceMappingURL=index.js.map