"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteUserRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var InviteUserRouter = /** @class */ (function () {
    function InviteUserRouter() {
        this.router = express.Router();
        this.router
            .post('/invite', middleware.requireAdmin, routes_1.InviteUserRoutes.inviteUser)
            .post('/resend-invite', middleware.requireAdmin, routes_1.InviteUserRoutes.resendInvites)
            .get('/invited-users', middleware.requireAdmin, routes_1.InviteUserRoutes.getInvitedUser)
            .get('/cancelInvite/:id', middleware.requireAdmin, routes_1.InviteUserRoutes.cancelInvite)
            .post('/invite/single-user', middleware.requireAdminOrModerator, routes_1.InviteUserRoutes.inviteSingleUser)
            .get('/all-invited-users', middleware.requireAdmin, routes_1.InviteUserRoutes.getAllInvitedUser)
            .put('/updateInvite/:id', routes_1.InviteUserRoutes.updateInvite);
    }
    return InviteUserRouter;
}());
exports.InviteUserRouter = InviteUserRouter;
//# sourceMappingURL=index.js.map