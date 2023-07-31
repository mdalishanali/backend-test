"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralsSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.ReferralsSchema = new mongoose.Schema({
    referredByRef: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    referredToRef: {
        type: ObjectId,
        ref: 'User',
    },
    dateOfJoining: {
        type: Date,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        enum: ['SIGN_UP'],
        required: false,
    },
    referralActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
//# sourceMappingURL=referrals.js.map