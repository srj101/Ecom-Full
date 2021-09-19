import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs/index.js";
import resolvers from "./graphql/resolvers/index.js";

const url =
  "mongodb+srv://admin:0M28JrIvZVYIrBat@cluster0.16tkt.mongodb.net/ecom?retryWrites=true&w=majority";

const app = new ApolloServer({ typeDefs, resolvers });

try {
  const cmongo = await mongoose.connect(url);
  console.log("database connected!");
  app.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} catch (error) {
  if ((error.code = "ETIMEOUT")) {
    throw "Connection Lost";
  }
  throw error.code;
}
