"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.router = express.Router();
        this.router.post('/registerLoginOauth', routes_1.AuthRoutes.registerLoginOauth);
        this.router.post('/register', routes_1.AuthRoutes.register);
        this.router.post('/login', routes_1.AuthRoutes.login);
        this.router.post('/send-reset-email', routes_1.AuthRoutes.sendResetEmail);
        this.router.get('/reset-password/:token', routes_1.AuthRoutes.resetPassword);
        this.router.post('/update-password', routes_1.AuthRoutes.updatePassword);
        this.router.get('/me', routes_1.AuthRoutes.me);
        this.router.put('/:id/unsubscribe', routes_1.AuthRoutes.unsubscribe);
        this.router.put('/delete-firebase-user/:uid', routes_1.AuthRoutes.deleteFirebaseUser);
    }
    return AuthRouter;
}());
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=index.js.map