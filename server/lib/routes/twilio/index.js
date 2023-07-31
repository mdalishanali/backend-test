"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioRouter = void 0;
var express = require("express");
var routes_1 = require("./routes");
var TwilioRouter = /** @class */ (function () {
    function TwilioRouter() {
        this.router = express.Router();
        this.router.post('/send', routes_1.TwilioRoutes.send);
    }
    return TwilioRouter;
}());
exports.TwilioRouter = TwilioRouter;
//# sourceMappingURL=index.js.map