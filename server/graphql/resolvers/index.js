import jsonwebtoken from "jsonwebtoken";
import Category from "../../models/category.js";
import Product from "../../models/product.js";
import Review from "../../models/review.js";
import User from "../../models/User.js";
import { createTokens } from "../../utils/authTokens.js";
import { hashPassword, checkHashpass } from "../../utils/passwordHasher.js";

const resolvers = {
  Query: {
    categories: async () => await Category.find(),
    products: async () => await Product.find(),
    reviews: async () => await Review.find(),
    productByID: async (_, { id }) => await Product.findById({ id }),
    SearchProducts: async (_, { input }) => {
      try {
        let Products;
        const { tag, colorName, catName } = input;

        if (catName && colorName && tag) {
          console.log("cat,colorName,tag ===>", tag);
          Products = await Product.find({
            tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
            colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
            catName: new RegExp(catName, "i"),
          });
        } else if (tag && !colorName && !catName) {
          console.log("tag");
          Products = await Product.find({
            tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
          });
        } else if (colorName && !tag && !catName) {
          console.log("colorName");
          Products = await Product.find({
            colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
          });
        } else if (catName && !tag && !colorName) {
          console.log("cat");
          Products = await Product.find({
            catName: new RegExp(catName, "i"),
          });
        } else if (catName && tag && !colorName) {
          console.log("cat,tag");
          Products = await Product.find({
            tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
            catName: new RegExp(catName, "i"),
          });
        } else if (catName && colorName && !tag) {
          console.log("cat,colorName");
          Products = await Product.find({
            catName: new RegExp(catName, "i"),
            colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
          });
        } else if (tag && colorName && !catName) {
          console.log("colorName,tag");
          Products = await Product.find({
            tags: { tag: new RegExp(tag, "i") },
            colors: { colorName: new RegExp(colorName, "i") },
          });
        } else {
          Products = await Product.find({});
        }

        return Products;
      } catch (err) {
        throw err;
      }
    },
    newArivals: async () => {
      const product = await Product.find({ new: true }, {}, { limit: 10 });
      return product;
    },
    userProfile: async (_, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      return User.findOne({ _id: req.userId });
    },
  },

  Category: {
    catproducts: async ({ id }) => {
      const product = await Product.find({ categoryid: id });
      return product;
    },
    catNewProducts: async ({ id }) => {
      const product = await Product.find({ categoryid: id, new: true });
      return product;
    },
  },

  Product: {
    reviews: async ({ id }) => {
      const review = await Review.find({ productid: id });
      return review;
    },
    related_products: async ({ tags }) => {
      try {
        const tag = tags[0].tag;
        const tagProducts = await Product.find({
          tags: { $elemMatch: { tag } },
        });
        return tagProducts;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createCategories: async (_, { catname, catimage }) => {
      try {
        const findCat = await Category.findOne({ catname });
        console.log(findCat);
        if (findCat) {
          const update = await Category.findOneAndUpdate(
            { catname },
            { $set: { catname, catimage } },
            { new: true }
          );
          console.log(update);
          return update;
        } else {
          const createCat = new Category({ catname, catimage });
          await createCat.save();
          console.log(createCat);
          return createCat;
        }
      } catch (err) {
        throw err;
      }
    },
    createProduct: async (_, { input }) => {
      try {
        const createProduct = new Product(input);
        await createProduct.save();
        return createProduct;
      } catch (err) {
        throw err;
      }
    },
    createReviews: async (_, { input }) => {
      try {
        const createReview = new Review(input);
        await createReview.save();
        return createReview;
      } catch (err) {
        throw err;
      }
    },
    registration: async (_, { input }) => {
      try {
        const existsCheck = await User.findOne({ email: input.email });
        if (existsCheck) {
          return "You have an account, Just login!";
        }
        const password = await hashPassword(input);
        const addUser = new User({ ...input, password });
        await addUser.save();
        return true;
      } catch (error) {
        throw error;
      }
    },
    login: async (_, input, { res }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          return "Wrong credentials!";
        }

        const passwordisOkay = await checkHashpass(
          input.password,
          user.password
        );

        if (passwordisOkay) {
          const { refreshToken, accessToken } = createTokens(user);

          res.cookie("refresh_token", refreshToken, {
            maxAge: 604800000,
            secure: true,
            sameSite: "None",
          });
          res.cookie("access_token", accessToken, {
            maxAge: 1800000,
            secure: true,
            sameSite: "None",
          });

          return accessToken;
        }
      } catch (error) {
        throw error;
      }
    },
    invalidateTokens: async (_, __, { req }) => {
      if (!req.userId) {
        return false;
      }
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return false;
      }
      user.count += 1;
      await user.save();
      return true;
    },
    deleteProduct: async (_, { id }) => {
      try {
        await Product.deleteOne({ id });
      } catch (error) {
        throw error;
      }
      return "Successfully deleted";
    },
  },
};

export default resolvers;
