const { gql } = require('apollo-server-express');

//TODO: Implement review CRUD resolvers & review type
const typeDefs = gql`
  extend type Query {
    getReview(id: String!): Review
    getReviews(userId: String!): [Review]
  }

  extend type Mutation {
    createReview(recipe: String!, content: String!): Review @isAuthenticated
    modifyReview(id: String!, content: String!): Review @isAuthenticated
    deleteReview(id: String!): String @isAuthenticated
  }

  type Review {
    id: String!
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
