import { gql } from 'apollo-boost';

export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $description: String!
    $equipment: [EquipmentInput!]!
    $ingredients: [IngredientInput!]!
    $instructions: [InstructionInput!]!
    $images: [ImageInput!]!
    $calories: Int
    $cookingTime: String
    $difficulty: Difficulty
    $portions: Int
    $notes: String
    $tags: [ID!]
    $categories: [ID!]
  ) {
    createRecipe(
      recipe: {
        title: $title
        description: $description
        equipment: $equipment
        ingredients: $ingredients
        instructions: $instructions
        images: $images
        calories: $calories
        cookingTime: $cookingTime
        difficulty: $difficulty
        portions: $portions
        notes: $notes
        tags: $tags
        categories: $categories
      }
    ) {
      id
      title
      description
      equipment {
        amount
        name
      }
      ingredients {
        amount
        ingredient
      }
      instructions {
        step
        text
        image {
          _id
          filename
          mimetype
          path
        }
      }
      images {
        file {
          _id
          filename
          mimetype
          path
        }
        primary
        altText
      }
      calories
      cookingTime
      difficulty
      portions
      created
      changed
      author {
        fullName
        id
      }
      originalAuthor {
        id
        fullName
      }
      notes
      tags {
        _id
        name
      }
      reviews {
        id
        created
        user {
          fullName
          id
        }
        content
      }
      categories {
        _id
        name
      }
      lists {
        id
        name
      }
      ratings {
        score
        user {
          id
        }
      }
      rating
    }
  }
`;

export const MODIFY_RECIPE = gql`
  mutation modifyRecipe(
    $id: ID!
    $title: String
    $description: String
    $equipment: [EquipmentInput!]
    $ingredients: [IngredientInput!]
    $instructions: [InstructionInput!]
    $images: [ImageInput!]
    $calories: Int
    $cookingTime: String
    $difficulty: Difficulty
    $portions: Int
    $notes: String
    $tags: [ID!]
    $categories: [ID!]
  ) {
    modifyRecipe(
      recipe: {
        id: $id
        title: $title
        description: $description
        equipment: $equipment
        ingredients: $ingredients
        instructions: $instructions
        images: $images
        calories: $calories
        cookingTime: $cookingTime
        difficulty: $difficulty
        portions: $portions
        notes: $notes
        tags: $tags
        categories: $categories
      }
    ) {
      id
      title
      description
      equipment {
        amount
        name
      }
      ingredients {
        amount
        ingredient
      }
      instructions {
        step
        text
        image {
          _id
          filename
          mimetype
          path
        }
      }
      images {
        file {
          _id
          filename
          mimetype
          path
        }
        primary
        altText
      }
      calories
      cookingTime
      difficulty
      portions
      created
      changed
      author {
        fullName
        id
      }
      originalAuthor {
        id
        fullName
      }
      notes
      tags {
        _id
        name
      }
      reviews {
        id
        created
        user {
          fullName
          id
        }
        content
      }
      categories {
        _id
        name
      }
      lists {
        id
        name
      }
      ratings {
        score
        user {
          id
        }
      }
      rating
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
