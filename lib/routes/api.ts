import * as express from 'express';

import { AdminRouter } from './admin/admin';
import { TodoRouter } from './todo';
import { AuthRouter } from './auth';
// import { PasswordRouter } from './password';

import { PaymentRouter } from './payment';
import { TwilioRouter } from './twilio';
import { Middleware } from '../services/middleware';
import { EmailRouter } from './email';
import { ChatRouter } from './chat';
import { FileRouter } from './file';
import { ReviewRouter } from './review';
import { UserRouter } from './user';
import { AwsRouter } from './aws';
import { JWPlayerRouter } from './jwPlayer';
import { RefundRouter } from './refunds';
import { FcmTokensRouter } from './fcmTokens';
import { InviteUserRouter, AcceptInviteRouter } from './inviteUser';
import { ApiLogServices } from '../services/api.log';
import { ErrorLogServices } from '../services/error.log';
import { AutoCompleteRouter } from './autoComplete';
import { SuperAdminRouter } from './superAdmin';
import { ProductsRouter } from './products';
import { OrderRouter } from './orders';
import { UtilsRouter } from './utils';
import { ReferralRouter } from './referrals';
import { StripeSubscriptionRouter } from './subscription';

const middleware = new Middleware();

export const api = express.Router();
api.use(middleware.jwtDecoder);

api.use('/admin', new AdminRouter().router);
api.use('/todo', new TodoRouter().router);
api.use('/superAdmin', new SuperAdminRouter().router);

// api.use('/password', new PasswordRouter().router);

api.use('/auth', new AuthRouter().router);
api.use('/payment', new PaymentRouter().router);
api.use('/subscription', new StripeSubscriptionRouter().router);
api.use('/twilio', new TwilioRouter().router);
api.use('/email', new EmailRouter().router);
api.use('/chat', new ChatRouter().router);
api.use('/file', new FileRouter().router);
api.use('/review', new ReviewRouter().router);
api.use('/user', new UserRouter().router);
api.use('/aws', new AwsRouter().router);
api.use('/jw-player', new JWPlayerRouter().router);
api.use('/inviteUser', new InviteUserRouter().router);
api.use('/accept-invite', new AcceptInviteRouter().router);
api.use('/refund', new RefundRouter().router);
api.use('/fcm-token', new FcmTokensRouter().router);
api.use('/autoComplete', new AutoCompleteRouter().router);
api.use('/products', new ProductsRouter().router);
api.use('/orders', new OrderRouter().router);
api.use('/utils', new UtilsRouter().router);
api.use('/referrals', new ReferralRouter().router);

api.use(ApiLogServices.apiLog);
api.use(ErrorLogServices.errorLog);
