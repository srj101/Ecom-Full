import Category from "../../models/category.js";
import Product from "../../models/product.js";
import Review from "../../models/review.js";
const resolvers = {
  Query: {
    categories: async () => await Category.find(),
    products: async () => await Product.find(),
    reviews: async () => await Review.find(),
    productByID: async (_, { id }) => await Product.findById(id),
    productByColor: async (_, { colorName }) => {
      const colorProducts = await Product.find({
        colors: { $elemMatch: { colorName } },
      });
      return colorProducts;
    },
    productByTag: async (_, { tag }) => {
      try {
        const tagProducts = await Product.find({
          tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
        });
        return tagProducts;
      } catch (err) {
        throw err;
      }
    },
    newArivals: async () => {
      const product = await Product.find({ new: true }, {}, { limit: 10 });
      return product;
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
  },
};

export default resolvers;
