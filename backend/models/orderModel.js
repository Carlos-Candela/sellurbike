const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const shippingAddressSchema = new Schema(
  {
    address: { type: String, required: false },
    city: { type: String, required: false },
    province: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    paymentIntentId: { type: String, required: true },
    sendStatus: {
      type: String,
      enum: ["pending", "sended", "completed"],
      default: "pending",
    },
    platformCalcInsurance: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    phone: { type: String, required: false },
    status: {
      type: String,
      required: true,
    },
    purchaseDate: { type: Date, default: Date.now },
    paymentMethod: { type: String, required: false },
    shippingAddress: { type: shippingAddressSchema, required: false },
  },
  { timestamps: true }
);

module.exports = model("orders", orderSchema);
