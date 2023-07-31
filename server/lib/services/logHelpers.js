"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskJsonData = void 0;
var MaskData = require("mask-json");
var maskJsonData = function (data) {
    var maskingOptions = ['password', 'token'];
    var masker = MaskData(maskingOptions);
    var maskedObj = masker(data);
    return maskedObj;
};
exports.maskJsonData = maskJsonData;
//# sourceMappingURL=logHelpers.js.map