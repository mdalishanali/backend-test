"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: "false",
        required: true
    },
    companyId: {
        type: ObjectId,
        required: false,
        ref: "Company"
    },
    userId: {
        type: ObjectId,
        required: false,
        ref: "User"
    }
}, { timestamps: true });
exports.TodoSchema.index({ name: "text", });
//# sourceMappingURL=todoSchema.js.map