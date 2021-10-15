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
    country: String,
    city: String,
    customer_id: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilepic: String,
    orders: [],
    count: {
      type: Number,
      default: 0,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Product = mongoose.model("User", userSchema);

export default Product;
