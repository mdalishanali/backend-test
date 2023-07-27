import * as mongoose from 'mongoose';
import autoPopulateAllFields from './plugins/populateAll';
const ObjectId = mongoose.Schema.Types.ObjectId;

import * as referralCodes from 'referral-codes';

export interface IUser {
  email: string;
  password: string;
  name: string;
  get: (path: string) => any;
  set: (path: string, value: any) => any;
  profile: any;
  firstName: string;
  roles: string[];
  oauth: string;
}

export const UserSchema = new mongoose.Schema(
  {
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
      default: 1578883746, // Use 1578883746 for 13th Jan 2020 & use 1607827746 for dec 2020
      set: (d) => {
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
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.pre<IUser>('save', function (next: any): void {
  const email = this.get('profile.email');
  if (email) {
    this.profile.email = this.profile.email.toLowerCase();
  }

  const firstName = this.firstName;
  if (firstName) {
    this.set('profile.name.first', firstName.trim());
  }

  const lastName = this.get('profile.name.last');
  if (lastName) {
    this.set('profile.name.last', lastName.trim());
  }
  if (this.roles.length === 0) {
    this.roles.push('user');
  }

  next();
});

UserSchema.virtual('fullName').get(function (): string {
  return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual('isSuperAdmin').get(function (): string {
  return this.roles.includes('Super Admin');
});

UserSchema.virtual('isAdmin').get(function (): string {
  return this.roles.includes('Admin');
});

UserSchema.virtual('isPaidUser').get(function (): boolean {
  const dateDifference = this.subscriptionActiveUntil - Date.now();
  return dateDifference / 1000 / 60 / 60 / 24 > 0 ? true : false;
});

UserSchema.index({
  email: 'text',
  'name.first': 'text',
  'name.last': 'text',
});

// Generate a referral code for a new user

UserSchema.pre<any>('save', function (next: any): void {
  if (!this.referralCode) {
    // Generate a unique referral code
    this.referralCode = referralCodes.generate({
      length: 8,
    })[0];
  }
  next();
});

UserSchema.plugin(autoPopulateAllFields);
