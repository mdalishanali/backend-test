"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
var mongoose = require("mongoose");
var preventDelete_1 = require("./plugins/preventDelete");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });
exports.ProductSchema.index({ name: "text", });
exports.ProductSchema.plugin(preventDelete_1.preventDeletePlugin);
//# sourceMappingURL=productsSchema.js.map