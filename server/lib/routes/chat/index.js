"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var middleware_1 = require("../../services/middleware");
var ChatRouter = /** @class */ (function () {
    function ChatRouter() {
        this.router = express.Router();
        this.router.use(new middleware_1.Middleware().requireLogin);
        this.router.get('/search-users', routes_1.ChatRoutes.searchUser);
        this.router.post('/add-users-info', routes_1.ChatRoutes.addUserDataToQuery);
    }
    return ChatRouter;
}());
exports.ChatRouter = ChatRouter;
//# sourceMappingURL=index.js.map