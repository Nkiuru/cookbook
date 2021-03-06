import { gql } from 'apollo-boost';

export const CREATE_LIST = gql`
  mutation createList($name: String!, $description: String!, $tags: [ID!], $categories: [ID!], $recipes: [ID!]) {
    createList(name: $name, tags: $tags, recipes: $recipes, description: $description, categories: $categories) {
      id
    }
  }
`;

export const MODIFY_LIST = gql`
  mutation modifyList(
    $id: ID!
    $name: String!
    $description: String!
    $categories: [ID!]
    $tags: [ID!]
    $recipes: [ID!]
  ) {
    modifyList(
      id: $id
      name: $name
      tags: $tags
      recipes: $recipes
      description: $description
      categories: $categories
    ) {
      id
    }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id)
  }
`;

export const ADD_RECIPE_TO_LIST = gql`
  mutation addRecipeToList($id: ID!, $recipe: ID!) {
    addRecipeToList(id: $id, recipe: $recipe) {
      id
    }
  }
`;
