"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var UtilsRouter = /** @class */ (function () {
    function UtilsRouter() {
        this.router = express.Router();
        this.router.get('/collections', routes_1.UtilsRoutes.findAllCollections);
        this.router.get('/sidebarItem', routes_1.UtilsRoutes.findAllSidebarItems);
    }
    return UtilsRouter;
}());
exports.UtilsRouter = UtilsRouter;
//# sourceMappingURL=index.js.map