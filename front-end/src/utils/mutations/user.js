import { gql } from 'apollo-boost';

export const UPDATE_USER = gql`
  mutation($id: ID, $email: String, $firstName: String, $lastName: String, $password: String) {
    updateUser(user: { id: $id, email: $email, lastName: $lastName, firstName: $firstName, password: $password }) {
      email
      firstName
      lastName
      fullName
      id
      isAdmin
    }
  }
`;
