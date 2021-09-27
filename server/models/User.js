import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    createdAt: Number,
    updatedAt: Number,
    firstname: String,
    lastname: String,
    nickname: String,
    phone: String,
    address: String,
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilepic: String,
    orders: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Product = mongoose.model("User", userSchema);

export default Product;
