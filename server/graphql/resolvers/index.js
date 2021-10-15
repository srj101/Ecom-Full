import Category from "../../models/category.js";
import Order from "../../models/Order.js";
import Product from "../../models/product.js";
import Review from "../../models/review.js";
import User from "../../models/User.js";
import { createTokens } from "../../utils/authTokens.js";
import { checkHashpass, hashPassword } from "../../utils/passwordHasher.js";
import Stripe from "stripe";
import { GraphQLScalarType, Kind } from "graphql";
import nodemailer from "nodemailer";
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return new Date(value); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const stripe = new Stripe(
  "sk_test_51Jk20oDwPmFHBpCJ7tqnEqkI3y9CQuKef6B8gCP01tclFia8AJYkMyqIlm5xwTDx2GziNIfQINVRFH3ND4R9TmJA00BXGpEJhG"
);
const DOMAIN = "http://localhost:3000";
const resolvers = {
  Date: dateScalar,
  Query: {
    categories: async () => await Category.find(),
    products: async () => await Product.find(),
    reviews: async () => await Review.find(),
    productByID: async (_, { id }) => await Product.findById({ _id: id }),
    SearchProducts: async (_, { input }) => {
      try {
        let Products;
        const { tag, colorName, catName, lth } = input;
        if (lth) {
          if (catName && colorName && tag) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  colors: {
                    $elemMatch: { colorName: new RegExp(colorName, "i") },
                  },
                  catName: new RegExp(catName, "i"),
                },
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                  colors: {
                    $elemMatch: { colorName: new RegExp(colorName, "i") },
                  },
                  catName: new RegExp(catName, "i"),
                },
              ],
            }).sort({ price: 1 });
          } else if (tag && !colorName && !catName) {
            Products = await Product.find({
              $or: [
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                },
                { name: new RegExp(tag, "i") },
              ],
            }).sort({ price: 1 });
          } else if (colorName && !tag && !catName) {
            Products = await Product.find({
              colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
            }).sort({ price: 1 });
          } else if (catName && !tag && !colorName) {
            Products = await Product.find({
              catName: new RegExp(catName, "i"),
            }).sort({ price: 1 });
          } else if (catName && tag && !colorName) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  catName: new RegExp(catName, "i"),
                },
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                  catName: new RegExp(catName, "i"),
                },
              ],
            }).sort({ price: 1 });
          } else if (catName && colorName && !tag) {
            Products = await Product.find({
              catName: new RegExp(catName, "i"),
              colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
            }).sort({ price: 1 });
          } else if (tag && colorName && !catName) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  colors: { colorName: new RegExp(colorName, "i") },
                },
                {
                  tags: { tag: new RegExp(tag, "i") },
                  colors: { colorName: new RegExp(colorName, "i") },
                },
              ],
            }).sort({ price: 1 });
          } else {
            Products = await Product.find({}).sort({ price: 1 });
          }
        } else {
          if (catName && colorName && tag) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  colors: {
                    $elemMatch: { colorName: new RegExp(colorName, "i") },
                  },
                  catName: new RegExp(catName, "i"),
                },
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                  colors: {
                    $elemMatch: { colorName: new RegExp(colorName, "i") },
                  },
                  catName: new RegExp(catName, "i"),
                },
              ],
            }).sort({ price: -1 });
          } else if (tag && !colorName && !catName) {
            Products = await Product.find({
              $or: [
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                },
                { name: new RegExp(tag, "i") },
              ],
            }).sort({ price: -1 });
          } else if (colorName && !tag && !catName) {
            Products = await Product.find({
              colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
            }).sort({ price: -1 });
          } else if (catName && !tag && !colorName) {
            Products = await Product.find({
              catName: new RegExp(catName, "i"),
            }).sort({ price: -1 });
          } else if (catName && tag && !colorName) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  catName: new RegExp(catName, "i"),
                },
                {
                  tags: { $elemMatch: { tag: new RegExp(tag, "i") } },
                  catName: new RegExp(catName, "i"),
                },
              ],
            }).sort({ price: -1 });
          } else if (catName && colorName && !tag) {
            Products = await Product.find({
              catName: new RegExp(catName, "i"),
              colors: { $elemMatch: { colorName: new RegExp(colorName, "i") } },
            }).sort({ price: -1 });
          } else if (tag && colorName && !catName) {
            Products = await Product.find({
              $or: [
                {
                  name: new RegExp(tag, "i"),
                  colors: { colorName: new RegExp(colorName, "i") },
                },
                {
                  tags: { tag: new RegExp(tag, "i") },
                  colors: { colorName: new RegExp(colorName, "i") },
                },
              ],
            }).sort({ price: -1 });
          } else {
            Products = await Product.find({}).sort({ price: -1 });
          }
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
    getOrders: async (_, __, { req }) => {
      if (!req.userId) {
        throw new Error("You must Login!");
      }

      const orders = await Order.find({ userId: req.userId }).sort({
        createdAt: -1,
      });
      return orders;
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
        if (findCat) {
          const update = await Category.findOneAndUpdate(
            { catname },
            { $set: { catname, catimage } },
            { new: true }
          );
          return update;
        } else {
          const createCat = new Category({ catname, catimage });
          await createCat.save();
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
    registration: async (_, { input }, { res }) => {
      try {
        const existsCheck = await User.findOne({ email: input.email });
        if (existsCheck) {
          throw new Error("You have an account, Just login!");
        }

        const passwordd = await hashPassword(input);
        const addUser = new User({ ...input, password: passwordd });
        await addUser.save();
        if (addUser) {
          const { refreshToken, accessToken } = createTokens(addUser);

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
          return true;
        }
        return false;
      } catch (error) {
        throw error;
      }
    },
    login: async (_, input, { res }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("Wrong credentials!");
        }

        const passwordisOkay = await checkHashpass(
          input.password,
          user.password
        );

        if (!passwordisOkay) {
          throw new Error("Wrong Password!");
        } else {
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
    upDateProfile: async (_, { input }, { req }) => {
      if (!req.userId) {
        throw new Error("You must Login!");
      }
      try {
        const { userId } = req;
        const user = await User.findOneAndUpdate({ _id: userId }, input, {
          new: true,
        });
        return user;
      } catch (error) {
        throw error;
      }
    },

    addToOrder: async (_, { input }, { req }) => {
      if (!req.userId) {
        throw new Error("You must Login!");
      }
      const randString =
        Date.now().toString(36) + Math.random().toString(36).substr(2);
      const user = await User.findOne({ _id: req.userId });
      const customer = await stripe.customers.create();
      await User.findOneAndUpdate(
        { _id: req.userId },
        { customer_id: customer.id }
      );

      try {
        const payment = await stripe.paymentIntents.create({
          amount: input.total * 100,
          currency: "usd",
          customer: customer.id,
          payment_method_types: ["card"],
          receipt_email: user.email,
          shipping: {
            name: user.firstname,
            address: {
              city: user.city,
              country: user.country,
              line1: user.address,
            },
            tracking_number: randString,
          },
        });
      } catch (error) {
        throw error;
      }

      const orders = new Order({
        ...input,
        userId: req.userId,
        tracking_number: randString,
        receipt_email: user.email,
        shipping: {
          email: user.email,
          address: user.address,
          country: user.country,
          city: user.city,
          tracking_number: randString,
        },
      });

      await orders.save();

      // Confirmation Email

      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "Gmail", // true for 465, false for other ports
        auth: {
          user: "salim15-3117@diu.edu.bd", // generated ethereal user
          pass: "Salimkhan1@", // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"ShoppingKORBO 👻" <salim15-3117@diu.edu.bd>', // sender address
        to: `<${user.email}>`, // list of receivers
        subject: `Hello ${user.firstname} ✔ from ShoppingKorbo`, // Subject line
        text: "Thanks for shopping in ShoppingKorbo!", // plain text body
        html: `<div><h2>Hope you are doing great sir.</h2><p>Thanks for buying of total $${
          input.total
        }</p>
        <style>tr:nth-child(even) {
          background-color: #D6EEEE;
        }table, th, td {
          border: 1px solid black;
        }</style>
            <table border="1">
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Address</th>
              <th>Tracking No.</th>
              </tr>
              <tr>
              <td>${user.firstname}</td>
              <td>${user.city}</td>
              <td>${user.country}</td>
              <td>${user.address}</td>
              <td>${randString}</td>
              </tr>
            </table>
            <hr />
            <table border="1">
            <h4>Products</h4>
            <tr><td>Product Name</td>
            <td>Product Price</td>
            <td>QTY</td></tr>

            ${input.products.map(
              (product) =>
                `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.quantity}</td></tr>`
            )}

            </table>
        </div>`, // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      return { ...orders, client_secret: customer.id };
    },
  },
};

export default resolvers;
