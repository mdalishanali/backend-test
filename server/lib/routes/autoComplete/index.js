"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoCompleteRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var AutoCompleteRouter = /** @class */ (function () {
    function AutoCompleteRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireLogin);
        this.router
            .get('/', routes_1.AutoCompleteRoutes.get);
    }
    return AutoCompleteRouter;
}());
exports.AutoCompleteRouter = AutoCompleteRouter;
//# sourceMappingURL=index.js.map