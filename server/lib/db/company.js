"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanySchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        mockName: 'name'
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: false,
    },
    status: {
        type: String,
        enum: ['Active', 'InActive'],
        default: 'Active',
    },
    website: {
        type: String,
        required: false,
        mockName: 'url'
    }
}, { timestamps: true });
exports.CompanySchema.index({ name: 'text', website: 'text' });
//# sourceMappingURL=company.js.map