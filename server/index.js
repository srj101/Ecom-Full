import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import { createTokens } from "./utils/authTokens.js";

const url =
  "mongodb+srv://srjoy:4xdtm.fggcTXCqH@cluster0.16tkt.mongodb.net/ecom?retryWrites=true&w=majority";

const startServer = async () => {
  try {
    const cmongo = await mongoose.connect(url);
    console.log("database sucsessfully connected");

    const app = express();

    var whitelist = [
      "https://studio.apollographql.com",
      "http://localhost:3000",
    ];
    var corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    };
    app.use(cors(corsOptions));

    // app.use(
    //   cors({
    //     origin: "https://studio.apollographql.com",
    //     credentials: true,
    //   })
    // );
    app.use(cookieParser());
    app.use(async (req, res, next) => {
      const accessToken = req.cookies["access_token"];
      const refreshToken = req.cookies["refresh_token"];

      if (!accessToken && !refreshToken) {
        return next();
      }

      try {
        const data = jwt.verify(accessToken, "SUPER_SECRETTTT");
        req.userId = data.userId;
        return next();
      } catch (error) {}

      if (!refreshToken) {
        return next();
      }

      let data;

      try {
        data = jwt.verify(refreshToken, "SUPER_SECRETTTTTT");
      } catch {
        return next();
      }

      const user = await User.findOne({ _id: data.userId });
      if (!user || user.count !== data.count) {
        return next();
      }

      const tokens = createTokens(user);
      res.cookie("refresh_token", tokens.refreshToken, {
        maxAge: 604800000,
        secure: true,
        sameSite: "None",
      });
      res.cookie("access_token", tokens.accessToken, {
        maxAge: 1800000,
        secure: true,
        sameSite: "None",
      });

      req.userId = user.id;

      next();
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({ req, res }),
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql", cors: false });

    app.listen({ port: 4000 }, () => {
      console.log(`🚀  Server ready at localhost:4000${server.graphqlPath}`);
    });
  } catch (error) {
    throw error;
  }
};

startServer();
