 import TodoSchema from './todo-hooks-and-virtuals';
      import * as mongoose from 'mongoose';
import { UserSchema } from './user';
import { PaymentSchema } from './payment';
import { ReviewSchema } from './review';
import { InvitedUserSchema } from './inviteUsers';
import { RefundsSchema } from './refundSchema';
import { CompanySchema } from './company';
import { config } from '../config';
import { FcmTokensSchema } from './fcmTokens';
import * as dotenv from 'dotenv';
import { ProductSchema } from './productsSchema';
import { OrdersSchema } from './orderSchema';
import { SubscriptionSchema } from './subscriptionSchema';
import { SubscriptionPlanSchema } from './subscriptionPlan';
import { ReferralsSchema } from './referrals';

const PATH = config.DB_PATH || 'mongodb://localhost:27017/boilerplate';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(PATH);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.info('connected to db ', PATH));

export const User = mongoose.model('User', UserSchema);
export const Payment = mongoose.model('Payment', PaymentSchema);
export const Review = mongoose.model('Review', ReviewSchema);
export const InvitedUsers = mongoose.model('InvitedUsers', InvitedUserSchema);
export const Refund = mongoose.model('Refund', RefundsSchema);
export const Company = mongoose.model('Company', CompanySchema);
export const FcmTokens = mongoose.model('FcmTokens', FcmTokensSchema);
export const Products = mongoose.model('Products', ProductSchema);
export const Orders = mongoose.model('Orders', OrdersSchema);
export const Referrals = mongoose.model('Referrals', ReferralsSchema);
export const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export const SubscriptionPlan = mongoose.model(
  'SubscriptionPlan',
  SubscriptionPlanSchema
);

const allModel = {
  User,
};

export const findModel = (modelName: string) => {
  const model = allModel[modelName];
  if (model) {
    return model;
  }
};

         export const Todo = mongoose.model('todo', TodoSchema)