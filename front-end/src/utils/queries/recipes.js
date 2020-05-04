import { gql } from 'apollo-boost';

export const GET_RECIPE = gql`
  query($id: ID!) {
    getRecipe(id: $id) {
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
    }
  }
`;

export const GET_RECIPES = gql`
  query(
    $searchTerm: String
    $ingredients: [ID!]
    $categories: [ID!]
    $tags: [ID!]
    $list: ID
    $difficulty: Difficulty
    $author: ID
    $rating: Int
    $startPoint: Int
    $showDeleted: Boolean
  ) {
    getRecipes(
      searchTerm: $searchTerm
      ingredients: $ingredients
      categories: $categories
      tags: $tags
      list: $list
      difficulty: $difficulty
      author: $author
      rating: $rating
      startPoint: $startPoint
      showDeleted: $showDeleted
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
