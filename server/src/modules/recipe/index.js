const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {

  }

  extend type Mutation {

  }

  type Recipe {
    id: String!
    description: String!
    equipment: [Equipment]!
    ingredients: [RecipeIngredient]!
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

  type Instruction {
    step: String!
    text: String!
    image: String
  }

  type Image {
    image: String!
    primary: Boolean
    altText: String
  }

  type RecipeIngredient {
    amount: Float!
    unit: Unit!
    ingredient: Ingredient
  }

  type Equipment {
    amount: Float!
    tool: Tool!
  }

  type Rating {
    user: User!
    recipe: Recipe!
    score: Int!
  }

  enum Difficulty {
    BEGINNER
    NOVICE
    INTERMEDIATE
    EXPERIENCED
    ADVANCED
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
