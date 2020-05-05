import { gql } from 'apollo-boost';

export const CREATE_REVIEW = gql`
  mutation createReview($recipe: ID!, $content: String!) {
    createReview(recipe: $recipe, content: $content) {
      id
      user {
        fullName
        id
      }
      content
      created
    }
  }
`;

export const MODIFY_REVIEW = gql`
  mutation modifyReview($id: ID!, $content: String!) {
    modifyReview(id: $id, content: $content) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
