"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express.Router();
        this.router.post('/send-reset-email', routes_1.UserRoutes.sendResetEmail);
        this.router.get('/reset-password/:token', routes_1.UserRoutes.resetPassword);
        this.router.post('/update-password', routes_1.UserRoutes.updatePassword);
        this.router.get('/me', routes_1.UserRoutes.me);
        this.router.put('/:id/unsubscribe', routes_1.UserRoutes.unsubscribe);
        this.router.post('/changePassword', routes_1.UserRoutes.changePassword);
        this.router.put('/update-profile', routes_1.UserRoutes.updateProfile);
    }
    return UserRouter;
}());
exports.UserRouter = UserRouter;
//# sourceMappingURL=index.js.map