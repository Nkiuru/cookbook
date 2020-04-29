const { gql, SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

const typeDef = gql`
  directive @isAdmin on FIELD_DEFINITION
`;

class IsAdminDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line no-unused-vars
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      const context = args[2];

      if (!context || !context.user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }

      return resolve.apply(this, args);
    };
  }
}

module.exports = {
  typeDef,
  directive: IsAdminDirective,
};
