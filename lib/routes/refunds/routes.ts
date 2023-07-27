import * as status from 'http-status';
import * as express from 'express';

import { RefundHelpers } from './helpers';
import { OrdersHelpers } from '../orders/helpers';
import { AuthenticatedRequest } from '../../interfaces/authenticated-request';

export class RefundRoutes {
    public static getAllPayments = async (
        req: AuthenticatedRequest,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const query = req.query;
            const userId = req.user._id;
            const data = await RefundHelpers.getAllRefunds(query, userId);
            res.locals.code = status.OK;
            res.locals.res_obj = { data };
            return next();
        } catch (error) {
            next(error);
        }
    }

    public static create = async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
        try {
            const document = req.body.document;
            const createRefund = {
                refundedAmount: 0,
                orderRef: document.orderRef,
            }
            const updateOrderObject = {
                id: document.orderRef,
                update: {
                    paymentStatus: 'refund-pending'
                },
            }
            const dataPromise = RefundHelpers.create(createRefund);
            const UpdateOrderPromise = OrdersHelpers.findAndUpdate(updateOrderObject);
            const [data, updateOrder] = await Promise.all([dataPromise, UpdateOrderPromise])
            res.locals.code = status.OK;
            res.locals.res_obj = { data, updateOrder };
            return next();
        } catch (error) {
            next(error);
        }
    }
}
