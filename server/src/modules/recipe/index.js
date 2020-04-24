const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload
  extend type Query {
    getRecipe(id: ID!): Recipe
    getRecipes(
      searchTerm: String
      ingredients: String
      category: [String]
      tag: [String]
      list: String
      difficulty: Difficulty
      author: String
      rating: Int
      portions: Int
      startPoint: Int
      endPoint: Int
    ): [Recipe]
  }

  extend type Mutation {
    createRecipe(recipe: RecipeInput!): Recipe @isAuthenticated
    modifyRecipe(recipe: RecipeInputModify!): Recipe @isAuthenticated
    deleteRecipe(id: ID!): String @isAuthenticated
    cloneRecipe(id: ID!): Recipe
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
    rating: [Rating]
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
  }

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type Instruction {
    step: Int!
    text: String!
    image: String
  }

  type Image {
    file: File!
    primary: Boolean
    altText: String
  }

  type Ingredient {
    amount: String!
    ingredient: String!
  }

  type Equipment {
    amount: Float!
    name: String!
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

  input RecipeInput {
    title: String!
    description: String!
    equipment: [EquipmentInput]!
    ingredients: [IngredientInput]!
    instructions: [InstructionInput]!
    images: [ImageInput]!
    calories: Int
    cookingTime: String
    difficulty: Difficulty
    portions: Int
    author: String!
    notes: String
    tags: [TagInput]
    categories: [CategoryInput]
  }

  input EquipmentInput {
    amount: Float!
    name: String!
  }

  input IngredientInput {
    amount: String!
    ingredient: String!
  }

  input InstructionInput {
    step: Int!
    text: String!
    image: String
  }

  input ImageInput {
    file: Upload!
    primary: Boolean
    altText: String
  }

  input RecipeInputModify {
    title: String!
    description: String!
    equipment: [EquipmentInput]!
    ingredients: [IngredientInput]!
    instructions: [InstructionInput]!
    images: [ImageInput]!
    calories: Int
    cookingTime: String
    difficulty: Difficulty
    portions: Int
    notes: String
    tags: [TagInput]
    categories: [CategoryInput]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
