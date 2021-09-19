import gql from "graphql-tag";

export const createBookMutation = gql`
  mutation addBook($createBookAddBookInput: CreateBookInput!) {
    createBook(addBookInput: $createBookAddBookInput) {
      Book {
        id
        header
        body
      }
      errors {
        field
        message
      }
    }
  }
`;
export const deleteBookMutation = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId)
  }
`;
export const updateBookMutation = gql`
  mutation updateBook($updateBookInput: UpdateBookInput!) {
    updateBook(updateBookInput: $updateBookInput) {
      Book {
        body
        header
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
export const addBookImageMutation = gql`
  mutation addBookImage($BookId: String!, $Image: Upload!) {
    addBookImage(bookId: $BookId, image: $Image)
  }
`;
export const deleteBookImageMutation = gql`
  mutation deleteBookImage($ImageId: String!) {
    deleteBookImage(imageId: $ImageId)
  }
`;
export const addBookPaymentOption = gql`
  mutation ($paymentOption: PaymentOptionCreateType!, $bookId: String!) {
    addBookPaymentOption(paymentOption: $paymentOption, bookId: $bookId)
  }
`;
export const deleteBookPaymentOption = gql`
  mutation ($paymentId: String!) {
    deletePaymentOption(paymentId: $paymentId)
  }
`;
export const addCharacterMutation = gql`
  mutation ($addCharacterInput: AddCharacterInput!) {
    createCharacter(addCharacterInput: $addCharacterInput) {
      character {
        bio
        color
        date_of_birth
        ethnicity
        gender
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
`;
export const updateCharacterMutation = gql`
  mutation ($updateCharacterInput: UpdateCharacterInput!) {
    updateCharacter(updateCharacterInput: $updateCharacterInput) {
      character {
        id
        name
        gender
        color
        ethnicity
        bio
        date_of_birth
        category {
          title
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
export const deleteCharacterMutation = gql`
  mutation ($id: String!) {
    deleteCharacter(id: $id)
  }
`;
export const addCharacterImageMutation = gql`
  mutation ($charId: String!, $Image: Upload!) {
    addCharacterImage(charId: $charId, image: $Image)
  }
`;
export const deleteCharacterImageMutation = gql`
  mutation ($imageId: String!) {
    deleteCharacterImage(imageId: $imageId)
  }
`;
export const addCategoryMutation = gql`
  mutation ($title: String!) {
    addCategory(title: $title)
  }
`;
export const deleteCategoryMutation = gql`
  mutation ($catId: String!) {
    deleteCategory(catId: $catId)
  }
`;
