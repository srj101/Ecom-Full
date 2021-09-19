import { gql } from "apollo-server";
const typeDefs = gql`
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

  type Query {
    products: [Product]
    reviews: [Review]
    productByID(id: String!): Product
    productByColor(colorName: String): [Product]
    productByTag(tag: String): [Product]
    categories: [Category]
    newArivals: [Product]
  }

  type Mutation {
    createProduct(input: ProductContents): Product
    createReviews(input: ReviewContents): Review
    createCategories(catname: String!, catimage: String!): Category
  }
`;

export default typeDefs;
