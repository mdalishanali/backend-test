"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var ReviewRouter = /** @class */ (function () {
    function ReviewRouter() {
        this.router = express.Router();
        this.router.post('/', routes_1.ReviewRoutes.create);
    }
    return ReviewRouter;
}());
exports.ReviewRouter = ReviewRouter;
//# sourceMappingURL=index.js.map