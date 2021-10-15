import mongoose from "mongoose";
const Schema = mongoose.Schema;
const descSchema = new mongoose.Schema({
  text: String,
  weight: String,
  Dimensions: String,
  otherInfo: String,
});
const orderSchema = mongoose.Schema(
  {
    amount: Number,
    status: {
      type: String,
      default: "pending",
    },
    userId: String,
    shipping: {},
    tracking_number: String,
    receipt_email: String,
    desc: [descSchema],
    total: Number,
    products: [],
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
