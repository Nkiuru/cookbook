import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
        fullName
        id
        isAdmin
      }
      token
    }
  }
`;

export const SIGNGUP = gql`
  mutation($email: String!, $firstName: String!, $lastName: String!, $password: String!) {
    signup(email: $email, firstName: $firstName, lastName: $lastName, password: $password) {
      email
      firstName
      lastName
      fullName
      id
      isAdmin
    }
  }
`;
