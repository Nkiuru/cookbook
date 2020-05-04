const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  extend type Query {
    getRecipe(id: ID!): Recipe
    getRecipes(
      searchTerm: String
      ingredients: [ID]
      categories: [ID!]
      tags: [ID!]
      list: ID
      difficulty: Difficulty
      author: ID
      rating: Int
      startPoint: Int
      showDeleted: Boolean
    ): [Recipe]
  }

  extend type Mutation {
    createRecipe(recipe: RecipeInput!): Recipe @isAuthenticated
    modifyRecipe(recipe: RecipeInputModify!): Recipe @isAuthenticated
    deleteRecipe(id: ID!): String @isAuthenticated
    cloneRecipe(id: ID!): Recipe @isAuthenticated
    rateRecipe(recipe: RecipeRatingInput!): Recipe @isAuthenticated
  }

  type Recipe {
    id: ID!
    title: String!
    description: String!
    equipment: [Equipment]!
    ingredients: [Ingredient]!
    instructions: [Instruction]!
    images: [Image]!
    calories: Int!
    cookingTime: String
    ratings: [Rating]
    difficulty: Difficulty
    portions: Int
    created: DateTime
    changed: DateTime
    originalAuthor: User
    author: User
    notes: String
    tags: [Tag]
    reviews: [Review]
    categories: [Category]
    lists: [List]
    rating: Float
  }

  type File {
    _id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type Instruction {
    step: Int!
    text: String!
    image: File
  }

  type Image {
    file: File!
    primary: Boolean
    altText: String
  }

  type Ingredient {
    _id: ID!
    amount: String!
    ingredient: String!
  }

  type Equipment {
    amount: Float!
    name: String!
  }

  type Rating {
    user: User!
    score: Int!
  }

  enum Difficulty {
    BEGINNER
    NOVICE
    INTERMEDIATE
    EXPERIENCED
    ADVANCED
  }

  input RecipeInput {
    title: String!
    description: String!
    equipment: [EquipmentInput!]!
    ingredients: [IngredientInput!]!
    instructions: [InstructionInput!]!
    images: [ImageInput!]!
    calories: Int
    cookingTime: String
    difficulty: Difficulty
    portions: Int
    notes: String
    tags: [ID!]
    categories: [ID!]
  }

  input EquipmentInput {
    amount: String!
    name: String!
  }

  input IngredientInput {
    amount: String!
    ingredient: String!
  }

  input InstructionInput {
    step: Int!
    text: String!
    image: Upload
  }

  input ImageInput {
    file: Upload!
    primary: Boolean
    altText: String
  }

  input RecipeInputModify {
    id: ID!
    title: String
    description: String
    equipment: [EquipmentInput]
    ingredients: [IngredientInput]
    instructions: [InstructionInput]
    images: [ImageInput]
    calories: Int
    cookingTime: String
    difficulty: Difficulty
    portions: Int
    notes: String
    tags: [ID!]
    categories: [ID!]
  }

  input RecipeRatingInput {
    id: ID!
    score: Int!
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
