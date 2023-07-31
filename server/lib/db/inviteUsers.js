"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitedUserSchema = void 0;
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
exports.InvitedUserSchema = new mongoose.Schema({
    invitedEmail: {
        type: String,
        required: true,
    },
    companyId: {
        type: ObjectId,
        ref: 'Company',
        required: false,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Moderator'],
        default: 'Moderator'
    },
    expiry: {
        type: Number,
        default: Date.now() + 1 * (60 * 60 * 1000)
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    permissions: [
        {
            collectionName: {
                type: String,
                required: true
            },
            access: {
                type: Boolean,
                default: false,
            },
            permission: {
                type: String,
            }
        }
    ]
}, { timestamps: true });
//# sourceMappingURL=inviteUsers.js.map