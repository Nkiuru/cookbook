const isAuthenticated = require('./is-authenticated');
const isAdmin = require('./is-admin');

module.exports = {
  typeDefs: [isAuthenticated.typeDef, isAdmin.typeDef],
  schemaDirectives: {
    isAuthenticated: isAuthenticated.directive,
    isAdmin: isAdmin.directive,
  },
};
