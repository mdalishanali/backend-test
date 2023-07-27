import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const SubscriptionSchema = new mongoose.Schema(
  {
    userRef: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    currentPeriodStarts: {
      type: Number,
      required: true,
    },
    currentPeriodEnds: {
      type: Number,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: false,
    },
    subscriptionCancellationRequested: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'inactive',
    },
    subscriptionPlanRef: {
      type: ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
  },
  { timestamps: true }
);
