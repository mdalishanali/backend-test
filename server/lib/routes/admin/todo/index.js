"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
// NPM Deps
var express = require("express");
var middleware_1 = require("../../../services/middleware");
// Internal Deps
var routes_1 = require("./routes");
var middleware = new middleware_1.Middleware();
var TodoRouter = /** @class */ (function () {
    function TodoRouter() {
        this.router = express.Router();
        this.router.use(middleware.requireAdmin);
        this.router
            .get('/', routes_1.TodoRoutes.get)
            .post('/', routes_1.TodoRoutes.create);
        this.router
            .get('/:id', routes_1.TodoRoutes.getOne)
            .put('/:id', routes_1.TodoRoutes.update)
            .delete('/:id', routes_1.TodoRoutes.delete);
    }
    return TodoRouter;
}());
exports.TodoRouter = TodoRouter;
//# sourceMappingURL=index.js.map