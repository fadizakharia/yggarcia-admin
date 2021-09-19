import { gql } from "@apollo/client";

export const IS_AUTHENTICATED = gql`
  query {
    isAuthenticated {
      permissions
      errors {
        field
        message
      }
    }
  }
`;
export const getBooks = gql`
  query {
    getBooks {
      Books {
        id
        body
        genres
        header
        purchase_options {
          id
          title
          url
          iconUrl
        }
        images {
          id
          imageUrl
          key
          localImageUrl
        }
        status
        subtitle
        title
        warning_message
      }
      errors {
        field
        message
      }
    }
  }
`;
export const getCategoriesQuery = gql`
  query {
    getCategories {
      title
      id
    }
  }
`;
export const getCharactersQuery = gql`
  query ($step: Float, $page: Float, $cat: String) {
    getCharacters(step: $step, page: $page, cat: $cat) {
      total
      characters {
        id
        name
        gender
        color
        ethnicity
        bio
        date_of_birth
        images {
          id
          imageUrl
          key
        }
        category {
          id
          title
        }
      }
    }
  }
`;
