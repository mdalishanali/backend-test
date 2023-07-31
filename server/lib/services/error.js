"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
var ErrorService = /** @class */ (function () {
    function ErrorService() {
    }
    ErrorService.handleError = function (_a) {
        var res = _a.res, error = _a.error;
        res.error(error);
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.js.map