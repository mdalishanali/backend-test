"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.OrdersSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        required: false,
        ref: "Products"
    },
    chargeId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: ObjectId,
        required: false,
        ref: "User"
    },
    paymentStatus: {
        type: String,
        require: true,
    },
    paymentMethodDetails: {}
}, { timestamps: true });
//# sourceMappingURL=orderSchema.js.map