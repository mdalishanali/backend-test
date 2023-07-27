

import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const OrdersSchema = new mongoose.Schema({
        productId: {
                type: ObjectId,
                required: false,
                ref: "Products"
        },
        chargeId: {
                type: String,
                required: true,
                unique: true,
        },
        userId: {
                type: ObjectId,
                required: false,
                ref: "User"
        },
        paymentStatus: {
                type: String,
                require: true,
        },
        paymentMethodDetails: {
        }
}, { timestamps: true });


