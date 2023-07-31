"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmTokensRouter = void 0;
// NPM Deps
var express = require("express");
// Internal Deps
var routes_1 = require("./routes");
var middleware_1 = require("../../services/middleware");
var middleware = new middleware_1.Middleware();
var FcmTokensRouter = /** @class */ (function () {
    function FcmTokensRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router
            .get('/', routes_1.FcmTokensRoutes.get)
            .get('/:id', routes_1.FcmTokensRoutes.getOne)
            .post('/', routes_1.FcmTokensRoutes.create)
            .put('/:id', routes_1.FcmTokensRoutes.update)
            .get('/userTokens', routes_1.FcmTokensRoutes.getUserTokens)
            .delete('/:token', routes_1.FcmTokensRoutes.deleteToken);
    }
    return FcmTokensRouter;
}());
exports.FcmTokensRouter = FcmTokensRouter;
//# sourceMappingURL=index.js.map