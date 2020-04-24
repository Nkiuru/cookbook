const { gql } = require('apollo-server-express');

//TODO: Implement review CRUD resolvers & review type
const typeDefs = gql`
  extend type Query {
    getReview(id: ID!): Review
    getReviews(userId: ID!): [Review]
  }

  extend type Mutation {
    createReview(recipe: ID!, content: String!): Review @isAuthenticated
    modifyReview(id: ID!, content: String!): Review @isAuthenticated
    deleteReview(id: ID!): String @isAuthenticated
  }

  type Review {
    id: ID!
    user: User!
    recipe: Recipe!
    content: String!
    created: DateTime
    updatedAt: DateTime
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
