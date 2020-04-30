import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  query($search: String!) {
    getUsers(searchTerm: $search) {
      fullName
      id
      email
    }
  }
`;
