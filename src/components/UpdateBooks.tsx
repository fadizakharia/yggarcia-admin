import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { updateBookMutation } from "../api/Graphql/Mutations";
import { Typography } from "@material-ui/core";
import { updateBookValidator } from "../util/validation";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/actions/loading";
import BookForm from "./BookForm";

const UpdateBooks = () => {
  const [updateBook, res] = useMutation(updateBookMutation);
  const dispatch = useDispatch();
  const [bookState, setBookState] = useState<any>();
  const currentBookState = useSelector<applicationState>(
    (state) => state.current
  ) as currentState;
  const loading = useSelector<applicationState>(
    (state) => state.loading.loading
  );
  useEffect(() => {
    if (currentBookState && currentBookState.book)
      setBookState({ ...currentBookState.book });

    return () => {};
  }, []);
  async function UpdateBookHandler(values: {
    id: string;
    body: string;
    header: string;
    status: number;
    subtitle: string;
    title: string;
    warning_message: string;
  }): Promise<void> {
    console.log(values);

    updateBook({
      variables: {
        updateBookInput: {
          ...values,
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
      {bookState ? (
        <BookForm
          handler={UpdateBookHandler}
          validationSchema={updateBookValidator}
          {...bookState}
        />
      ) : (
        <Typography>there is no book to edit!</Typography>
      )}

      {!loading && res.data && res.data.updateBook.Book && (
        <Redirect to="/books" />
      )}
      {!loading &&
        res.data &&
        res.data.updateBook.errors &&
        res.data.updateBook.errors.map(
          (er: { field: string; message: string }) => {
            <Typography variant="subtitle2">
              {er.field}: {er.message}
            </Typography>;
          }
        )}
      {!loading && res.error && res.error.message && (
        <Typography variant="subtitle2">{res.error.message}</Typography>
      )}
    </React.Fragment>
  );
};

export default UpdateBooks;
