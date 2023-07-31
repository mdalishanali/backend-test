"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.SubscriptionPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    // stripe subscription product Id
    productId: {
        type: String,
        required: true,
    },
    priceId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
//# sourceMappingURL=subscriptionPlan.js.map