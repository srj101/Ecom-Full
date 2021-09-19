import mongoose from "mongoose";

const Schema = mongoose.Schema;
const categorySchema = Schema(
  {
    catname: String,
    catimage: String,
    catproducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
