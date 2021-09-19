import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    name: String,
    rating: Number,
    Rimage: String,
    Comment: String,
    email: String,
    productid: String,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
