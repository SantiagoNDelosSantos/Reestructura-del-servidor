import mongoose from "mongoose";

const collection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        }, ],
    },
});

export const cartModel = mongoose.model(collection, cartSchema)