"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptInviteRouter = exports.InviteUserRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var InviteUserRouter = /** @class */ (function () {
    function InviteUserRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router.post('/invite', routes_1.InviteUserRoutes.inviteUser);
        this.router.post('/resend-invite', routes_1.InviteUserRoutes.resendInvites);
        this.router.get('/invited-users', routes_1.InviteUserRoutes.getInvitedUser);
        this.router.get('/cancelInvite/:id', routes_1.InviteUserRoutes.cancelInvite);
    }
    return InviteUserRouter;
}());
exports.InviteUserRouter = InviteUserRouter;
var AcceptInviteRouter = /** @class */ (function () {
    function AcceptInviteRouter() {
        this.router = express.Router();
        this.router.get('/invite', routes_1.InviteUserRoutes.checkInvitation);
        this.router.get('/accept-invite/:inviteToken', routes_1.InviteUserRoutes.acceptInvite);
        this.router.post('/accept/invite/single/:inviteToken', routes_1.InviteUserRoutes.acceptInviteSingleUser);
    }
    return AcceptInviteRouter;
}());
exports.AcceptInviteRouter = AcceptInviteRouter;
//# sourceMappingURL=index.js.map