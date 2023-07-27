import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const InvitedUserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
