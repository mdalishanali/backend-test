"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWPlayerRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var JWPlayerRouter = /** @class */ (function () {
    function JWPlayerRouter() {
        this.router = express.Router();
        this.router
            .post('/create-jwuri', routes_1.JWPlayerRoutes.createJwURl)
            .post('/get-videouri', routes_1.JWPlayerRoutes.getJWPlayerVideoUrls);
    }
    return JWPlayerRouter;
}());
exports.JWPlayerRouter = JWPlayerRouter;
//# sourceMappingURL=index.js.map