"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var EmailRouter = /** @class */ (function () {
    function EmailRouter() {
        this.router = express.Router();
        this.router.post('/contact-form', routes_1.EmailRoutes.contactForm);
    }
    return EmailRouter;
}());
exports.EmailRouter = EmailRouter;
//# sourceMappingURL=index.js.map