import * as status from 'http-status';
import * as express from 'express';
import * as StandardError from 'standard-error';

import { PaymentHelpers } from './helpers';
import { AuthenticatedRequest } from '../../../interfaces/authenticated-request';
import { stripeService } from '../../../services/stripe-service';
import { EmailService } from '../../../services/email';
import { PaymentErrorHandlerService } from '../../payment/payment-error-handler';
export class PaymentRoutes {
    public static getAllPayments = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const query = req.query;
            const data = await PaymentHelpers.getAllPayments(query);
            res.locals.code = status.OK;
            res.locals.res_obj = { data };
            return next();
        } catch (error) {
            next(error);
        }
    }

    public static createRefundForCharge = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const refundData = req.body.refundData;
            const payment = await PaymentHelpers.getPaymentById(refundData._id);
            const refundObj: { charge: string, amount: number, reason?: string } = {
                charge: payment.chargeId,
                amount: refundData.amount
            };
            if (Boolean(refundData.reason)) {
                refundObj.reason = refundData.reason;
            }
            const refundResponse = await stripeService.createRefundForCharge(refundObj);
            refundResponse.paymentId = refundData._id;
            refundResponse.user = payment.user;
            const data = await PaymentHelpers.createRefund(refundResponse);
            const penny = 100;
            const numberAfterDecimal = 2;
            const emailService = new EmailService();
            emailService.refundEmail({ email: payment.email, amount: Number((refundResponse.amount / penny).toFixed(numberAfterDecimal)), currency: refundResponse.currency, status: refundResponse.status });

            res.locals.code = status.OK;
            res.locals.res_obj = { data };
            return next();
        } catch (error) {
            if (Boolean(error.message)) {
                const errorObj = {
                    message: error.raw.message,
                    code: error.raw.statusCode
                };
                next(errorObj);
            }
            next(error);
        }
    }

    public static getAllCharges = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const query = req.query;
            const user = req.user;
            const { stripeAccountId } = user;
            const chargesPromise = PaymentHelpers.getSellerCharges(stripeAccountId, query);
            const balancePromise = PaymentHelpers.getSellerStripeBalance(stripeAccountId);
            const [charges, balance] = await Promise.all([chargesPromise, balancePromise]);
            res.locals.code = status.OK;
            res.locals.res_obj = { charges, balance };
            return next();
        } catch (error) {
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static getAllPayouts = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const query = req.query;
            const user = req.user;
            const { stripeAccountId } = user;
            const payoutsPromise = PaymentHelpers.getSellerPayouts(stripeAccountId, query);
            const balancePromise = PaymentHelpers.getSellerStripeBalance(stripeAccountId);
            const [payouts, balance] = await Promise.all([payoutsPromise, balancePromise]);
            res.locals.code = status.OK;
            res.locals.res_obj = { payouts, balance };
            return next();
        } catch (error) {
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    }

    public static createPayout = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const body = req.body;
            const amount = body.amount;
            const user = req.user;
            const data = await PaymentHelpers.createPayout(amount, user.stripeAccountId);
            res.locals.code = status.OK;
            res.locals.res_obj = { data }
            return next();
        } catch (error) {
            PaymentErrorHandlerService.PaymentErrorHandleError(error, next);
        }
    };
}
