import { gql } from "apollo-server";
const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String
    password: String!
    email: String!
    nickname: String!
    phone: String!
    address: String!
    profilepic: String
    count: Int
    orders: [Product]
  }

  type Category {
    id: ID
    catname: String
    catimage: String
    catproducts: [Product]
    catNewProducts: [Product]
  }

  type descType {
    text: String
    weight: String
    Dimensions: String
    otherInfo: String
  }

  type colorType {
    colorName: String
    colorCode: String
  }
  type tagsType {
    tag: String
  }

  type Product {
    id: ID
    price: Float
    SKU: String
    offerPrice: Float
    name: String
    stock: Int
    categoryid: String
    catName: String
    desc: [descType]
    new: Boolean
    best_seller: Boolean
    image: [String]
    colors: [colorType]
    tags: [tagsType]
    reviews: [Review]
    related_products: [Product]
  }

  type Review {
    id: ID
    name: String
    rating: Int
    productid: String
    Rimage: String
    Comment: String
    email: String
  }

  input descTypeIn {
    text: String
    weight: String
    Dimensions: String
    otherInfo: String
  }

  input colorTypeIn {
    colorName: String
    colorCode: String
  }

  input tagsIn {
    tag: String
  }

  input ProductContents {
    name: String
    offerPrice: Float
    SKU: String
    stock: Int
    new: Boolean
    best_seller: Boolean
    price: Float
    categoryid: String
    catName: String
    desc: [descTypeIn]
    image: [String]
    colors: [colorTypeIn]
    tags: [tagsIn]
  }

  input ReviewContents {
    name: String
    rating: Int
    Rimage: String
    productid: String
    Comment: String
    email: String
  }

  input userinput {
    firstname: String!
    lastname: String
    email: String!
    password: String!
    nickname: String!
    phone: String!
    address: String!
  }

  input SearchInput {
    colorName: String
    tag: String
    catName: String
  }

  type Query {
    products: [Product]
    reviews: [Review]
    productByID(id: String!): Product
    categories: [Category]
    newArivals: [Product]
    userProfile: User
    SearchProducts(input: SearchInput!): [Product]
  }

  type Mutation {
    createProduct(input: ProductContents): Product
    createReviews(input: ReviewContents): Review
    createCategories(catname: String!, catimage: String!): Category
    registration(input: userinput!): String
    login(email: String!, password: String!): String
    invalidateTokens: Boolean!
    deleteProduct(id: String!): String
  }
`;

export default typeDefs;
