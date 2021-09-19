import React from "react";
import { useMutation } from "@apollo/client";
import { createBookMutation } from "../api/Graphql/Mutations";
import { Typography } from "@material-ui/core";
import { createBookValidator } from "../util/validation";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/actions/loading";
import BookForm from "./BookForm";

const AddBooks = () => {
  const [createBook, res] = useMutation(createBookMutation);
  const dispatch = useDispatch();
  const loading = useSelector<applicationState>(
    (state) => state.loading.loading
  );
  async function addBookHandler(values: {
    body: string;
    header: string;
    status: number;
    subtitle: string;
    genres?: string;
    title: string;
    warning_message: string;
  }): Promise<void> {
    console.log(values);
    let formattedValues = {};
    if (values.genres) {
      if (values.genres.includes(",")) {
        Object.assign(formattedValues, {
          ...values,
          genres: values.genres.split(","),
        });
      } else {
        Object.assign(formattedValues, { ...values, genres: [values.genres] });
      }
    } else {
      Object.assign(formattedValues, values);
    }
    createBook({
      variables: {
        createBookAddBookInput: {
          ...formattedValues,
        },
      },
    });
  }

  if (res.loading) {
    dispatch(setIsLoading(true));
  } else {
    dispatch(setIsLoading(false));
  }

  return (
    <React.Fragment>
      <BookForm
        handler={addBookHandler}
        validationSchema={createBookValidator}
      />
      {!loading && res.data && res.data.createBook.Book && (
        <Redirect to="/books" />
      )}
      {!loading &&
        res.data &&
        res.data.createBook.errors &&
        res.data.createBook.errors.map(
          (er: { field: string; message: string }) => {
            return (
              <Typography variant="subtitle2">
                {er.field}: {er.message}
              </Typography>
            );
          }
        )}
      {!loading && res.error && res.error.message && (
        <Typography variant="subtitle2">{res.error.message}</Typography>
      )}
    </React.Fragment>
  );
};

export default AddBooks;
