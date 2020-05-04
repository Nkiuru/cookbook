import { gql } from 'apollo-boost';

export const CREATE_LIST = gql`
  mutation createList($name: String!, $description: String!, $tags: [ID!], $recipes: [ID!]) {
    createList(name: $name, tags: $tags, recipes: $recipes, description: $description) {
      id
    }
  }
`;

export const MODIFY_LIST = gql`
  mutation modifyList($id: ID!, $name: String!, $description: String!, $tags: [ID!], $recipes: [ID!]) {
    modifyList(id: $id, name: $name, tags: $tags, recipes: $recipes, description: $description) {
      id
    }
  }
`;

export const DELETE_LIST = gql`
  mutation deleteist($id: ID!) {
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
