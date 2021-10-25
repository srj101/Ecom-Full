import { gql } from "apollo-server";
const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstname: String!
    lastname: String
    password: String!
    email: String!
    nickname: String
    country: String
    city: String
    phone: String!
    address: String!
    profilepic: String
    count: Int
    orders: [OrderProduct]
    confirm: Boolean
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
    length: Int
  }

  type OrderProduct {
    id: ID
    price: Float
    SKU: String
    name: String
    stock: Int
    categoryid: String
    catName: String
    desc: [descType]
    image: [String]
    colors: [colorType]
    tags: [tagsType]
    quantity: Int
    createdAt: Date
    updatedAt: Date
  }

  type shippingType {
    address: String
    country: String
    city: String
    email: String
  }

  type Order {
    id: ID
    products: [OrderProduct]
    total: Int
    status: String
    tracking_number: String
    userId: String
    receipt_email: String
    description: String
    shipping: shippingType
    createdAt: Date
    updatedAt: Date
    client_secret: String
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
    country: String
    city: String
    nickname: String
    phone: String
    address: String
    profilepic: String
  }

  input updateUser {
    firstname: String
    lastname: String
    country: String
    city: String
    phone: String
    address: String
    profilepic: String
    nickname: String
  }

  input SearchInput {
    colorName: String
    tag: String
    catName: String
    lth: Boolean
    skip: Int
  }

  input orderedProduct {
    id: ID
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
    quantity: Int
  }

  input OrderInput {
    products: [orderedProduct]
    total: Int
  }

  type Query {
    products: [Product]
    reviews: [Review]
    productByID(id: String!): Product
    categories: [Category]
    newArivals: [Product]
    userProfile: User
    SearchProducts(input: SearchInput!): [Product]
    getOrders: [Order]
  }

  type Mutation {
    createProduct(input: ProductContents): Product
    createReviews(input: ReviewContents): Review
    createCategories(catname: String!, catimage: String!): Category
    registration(input: userinput!): String
    login(email: String!, password: String!): String
    upDateProfile(input: updateUser): User
    invalidateTokens: Boolean!
    deleteProduct(id: String!): String
    addToOrder(input: OrderInput!): Order
    confirmEmail(token: String!): String
    forgotPassword(email: String!): Boolean
    resetPasword(password: String!, token: String!, email: String!): Boolean
  }
`;

export default typeDefs;
