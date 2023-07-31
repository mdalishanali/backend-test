"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
var mongoose = require("mongoose");
var populateAll_1 = require("./plugins/populateAll");
var ObjectId = mongoose.Schema.Types.ObjectId;
var referralCodes = require("referral-codes");
exports.UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
    },
    subscribedToNewsletter: {
        type: Boolean,
        default: true,
    },
    firebaseUid: {
        type: String,
        required: true,
    },
    hasPassword: {
        type: Boolean,
        default: false,
    },
    oauth: {
        type: String,
        enum: ['FACEBOOK', 'GOOGLE', 'LINKEDIN', 'MICROSOFT', 'APPLE'],
        required: false,
    },
    roles: {
        type: String,
        enum: ['Admin', 'Moderator', 'User', 'Super Admin'],
        default: 'User',
    },
    stripeCustomerId: {
        type: String,
    },
    stripeAccountId: {
        type: String,
        required: false,
    },
    defaultCardToken: {
        type: String,
    },
    cardTokens: [String],
    renewalDate: {
        type: Date,
        required: false,
    },
    subscribedOn: {
        type: Number,
        required: false,
    },
    subscriptionActiveUntil: {
        type: Number,
        default: 1578883746,
        set: function (d) {
            return d * 1000;
        },
    },
    subscriptionId: {
        type: String,
        required: false,
    },
    subscriptionCancellationRequested: {
        type: Boolean,
        default: false,
    },
    referralCode: {
        type: String,
        unique: true,
    },
    referredBy: {
        type: ObjectId,
        ref: 'User',
        required: false,
    },
    referralRewards: {
        type: Number,
        default: 0,
    },
    companyId: {
        type: ObjectId,
        ref: 'Company',
        required: false,
    },
    subscriptionRef: {
        type: ObjectId,
        ref: 'Subscription',
        required: false,
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive'],
        required: false,
        default: 'inactive',
    },
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
exports.UserSchema.pre('save', function (next) {
    var email = this.get('profile.email');
    if (email) {
        this.profile.email = this.profile.email.toLowerCase();
    }
    var firstName = this.firstName;
    if (firstName) {
        this.set('profile.name.first', firstName.trim());
    }
    var lastName = this.get('profile.name.last');
    if (lastName) {
        this.set('profile.name.last', lastName.trim());
    }
    if (this.roles.length === 0) {
        this.roles.push('user');
    }
    next();
});
exports.UserSchema.virtual('fullName').get(function () {
    return this.name.first + " " + this.name.last;
});
exports.UserSchema.virtual('isSuperAdmin').get(function () {
    return this.roles.includes('Super Admin');
});
exports.UserSchema.virtual('isAdmin').get(function () {
    return this.roles.includes('Admin');
});
exports.UserSchema.virtual('isPaidUser').get(function () {
    var dateDifference = this.subscriptionActiveUntil - Date.now();
    return dateDifference / 1000 / 60 / 60 / 24 > 0 ? true : false;
});
exports.UserSchema.index({
    email: 'text',
    'name.first': 'text',
    'name.last': 'text',
});
// Generate a referral code for a new user
exports.UserSchema.pre('save', function (next) {
    if (!this.referralCode) {
        // Generate a unique referral code
        this.referralCode = referralCodes.generate({
            length: 8,
        })[0];
    }
    next();
});
exports.UserSchema.plugin(populateAll_1.default);
//# sourceMappingURL=user.js.map