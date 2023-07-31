"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundsSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.RefundsSchema = new mongoose.Schema({
    refundedAmount: {
        type: Number,
        default: 0,
        required: true,
    },
    orderRef: {
        type: ObjectId,
        required: true,
        ref: 'Orders',
        unique: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true,
    },
    reason: {
        type: String,
        default: 'requested_by_customer',
        required: true,
    },
}, { timestamps: true });
exports.RefundsSchema.index({ chargeId: 'text', refundId: 'text', paymentId: 'text' });
//# sourceMappingURL=refundSchema.js.map