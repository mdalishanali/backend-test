"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmTokensSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.FcmTokensSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    deviceType: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
//# sourceMappingURL=fcmTokens.js.map