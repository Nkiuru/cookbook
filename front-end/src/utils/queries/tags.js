import { gql } from 'apollo-boost';

export const GET_TAGS = gql`
  query {
    getTags {
      _id
      name
    }
  }
`;
