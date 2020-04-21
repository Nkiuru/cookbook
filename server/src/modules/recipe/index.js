const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Recipe {
    id: String!
    description: String!
    equipment: [Tool]!
    ingredients: [Ingredient]!
    instructions: [Instruction]!
    images: [Image]!
    calories: Int!
    cookingTime: String
    rating: [Rating]
    difficulty: Difficulty
    portions: Int
    created: DateTime
    changed: DateTime
    originalAuthor: User
    author: User
    tags: [Tag]
    reviews: [Review]
    categories: [Category]
    lists: [List]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
