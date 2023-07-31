"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var CompanyRouter = /** @class */ (function () {
    function CompanyRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireSuperAdmin);
        this.router.get('/', routes_1.CompanyRoutes.getCompanies);
        this.router.get('/:id', routes_1.CompanyRoutes.getCompanyDetails);
        this.router.put('/:id', routes_1.CompanyRoutes.editCompany);
        this.router.get('/users/:id', routes_1.CompanyRoutes.getCompanyUsers);
        this.router.get('/invites/:id', routes_1.CompanyRoutes.getCompanyInviteDetails);
        this.router.put('/change-user-role/:id', routes_1.CompanyRoutes.changeUserRole);
        this.router.post('/invite/:id', routes_1.CompanyRoutes.inviteUser);
        this.router.post('/resend-invite/:id', routes_1.CompanyRoutes.resendInvites);
        this.router.put('/cancelInvite/:id', routes_1.CompanyRoutes.cancelInvite);
    }
    return CompanyRouter;
}());
exports.CompanyRouter = CompanyRouter;
//# sourceMappingURL=index.js.map