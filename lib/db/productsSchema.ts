

import * as mongoose from 'mongoose';
import { preventDeletePlugin } from './plugins/preventDelete';
const ObjectId = mongoose.Schema.Types.ObjectId;

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
}, { timestamps: true });

ProductSchema.index(
    { name: "text", }
)

ProductSchema.plugin(preventDeletePlugin);
