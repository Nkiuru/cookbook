import { gql } from 'apollo-boost';

export const GET_MY_LISTS = gql`
  query {
    getMyLists {
      id
      name
      description
      owner {
        id
        fullName
      }
      tags {
        _id
        name
      }
      categories {
        _id
        name
      }
      recipes {
        id
        title
        images {
          file {
            _id
            filename
            path
            mimetype
          }
          altText
          primary
        }
      }
    }
  }
`;

export const GET_USERS_LISTS = gql`
  query($userId: ID!) {
    getUsersLists(userId: $userId) {
      id
      name
      description
      owner {
        id
        fullName
      }
      tags {
        _id
        name
      }
      categories {
        _id
        name
      }
      recipes {
        id
        title
        images {
          file {
            _id
            filename
            path
            mimetype
          }
          altText
          primary
        }
      }
    }
  }
`;
