"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var AdminUsersRouter = /** @class */ (function () {
    function AdminUsersRouter() {
        this.router = express.Router();
        this.router
            .get('/', routes_1.AdminUsersRoutes.get)
            .get('/:id', routes_1.AdminUsersRoutes.getOne);
    }
    return AdminUsersRouter;
}());
exports.AdminUsersRouter = AdminUsersRouter;
//# sourceMappingURL=index.js.map