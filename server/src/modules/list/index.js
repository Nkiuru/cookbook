const { gql } = require('apollo-server-express');

//TODO: Implement list CRUD & add recipe to list resolvers & list type
const typeDefs = gql`
  type List {
    name: String!
    owner: User!
    tags: [Tag]
    categories: [Category]
    recipes: [Recipe]
    followers: [User]
  }
`;

const resolvers = require('./resolvers');

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
