import * as express from 'express';
import * as status from 'http-status';

import { AuthenticatedRequest } from '../../../interfaces/authenticated-request';
import { StripePaymentHelpers } from './helpers';
import { PaymentErrorHandlerService } from '../../payment/payment-error-handler';

export class StripePaymentRoutes {
        public static getAllCharges = async (
                req: AuthenticatedRequest,
                res: express.Response,
                next: express.NextFunction
        ) => {
                try {
                        const query = req.query;
                        const user = req.user;
                        const {
                                balance,
                                charges,
                        } = await StripePaymentHelpers.getAllChargesSuperAdmin(query, user);
                        res.locals.code = status.OK;
                        res.locals.res_obj = { balance, charges }
                        return next();
                } catch (error) {
                        PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
                }
        };

        public static getAllPayouts = async (
                req: AuthenticatedRequest,
                res: express.Response,
                next: express.NextFunction
        ) => {
                try {
                        const query = req.query;
                        const user = req.user;
                        const data = await StripePaymentHelpers.getAllPayouts(query);
                        res.locals.code = status.OK;
                        res.locals.res_obj = { data }
                        return next();
                } catch (error) {
                        PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
                }
        };

        public static createPayout = async (
                req: AuthenticatedRequest,
                res: express.Response,
                next: express.NextFunction
        ) => {
                try {
                        const body = req.body;
                        const amount = body.amount;
                        const user = req.user;
                        const data = await StripePaymentHelpers.createPayout(amount);
                        res.locals.code = status.OK;
                        res.locals.res_obj = { data }
                        return next();
                } catch (error) {
                        console.log('error: ', error);
                        PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
                }
        };

        public static getAllSellers = async (
                req: AuthenticatedRequest,
                res: express.Response,
                next: express.NextFunction
        ) => {
                try {
                        const user = req.user;
                        const query = req.query;
                        const sellers = await StripePaymentHelpers.getAllSellersSuperAdmin(query, user)
                        res.locals.code = status.OK;
                        res.locals.res_obj = { sellers }
                        return next();
                } catch (error) {
                        PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
                }
        };

        public static getSellerChargesWithBalance = async (
                req: AuthenticatedRequest,
                res: express.Response,
                next: express.NextFunction
        ) => {
                try {
                        const { sellerStripeAccountId } = req.params;
                        const query = req.query;
                        const user = req.user;
                        const data = await StripePaymentHelpers.getAllSellerCharges(sellerStripeAccountId, query)
                        res.locals.code = status.OK;
                        res.locals.res_obj = data;
                        return next();
                } catch (error) {
                        PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
                }
        };
}
