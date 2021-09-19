import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  colorName: String,
  colorCode: String,
});
const tagsSchema = new mongoose.Schema({
  tag: String,
});

const descSchema = new mongoose.Schema({
  text: String,
  weight: String,
  Dimensions: String,
  otherInfo: String,
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    SKU: String,
    price: Number,
    offerPrice: Number,
    image: [String],
    categoryid: String,
    colors: [colorSchema],
    tags: [tagsSchema],
    new: {
      type: Boolean,
      default: true,
    },
    best_seller: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
    desc: [descSchema],
    createdAt: Number,
    updatedAt: Number,
    reviews: String,
    related_products: String,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
