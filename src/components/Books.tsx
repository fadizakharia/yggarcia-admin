import { useMutation, useQuery } from "@apollo/client";
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { DataGrid, GridRowId } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookImageMutation,
  addBookPaymentOption,
  deleteBookImageMutation,
  deleteBookMutation,
  deleteBookPaymentOption,
} from "../api/Graphql/Mutations";
import { getBooks } from "../api/Graphql/Queries";
import { setBook } from "../store/actions/current";
import { setIsLoading } from "../store/actions/loading";
import { getBookStatus, getBookReverseStatus } from "../util/BookUtils";

import CustomToolbar from "./CustomToolbar";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import Images from "./Images";
import PaymentOptions from "./PaymentOptions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 400,
      width: "100%",
    },
    rowActions: {
      padding: "30px 10px 10px 10px",
      boxSizing: "border-box",
      margin: "0",
      borderBottom: "1px solid rgba(0,0,0,0.3)",
      borderLeft: "1px solid rgba(0,0,0,0.3)",
      borderRight: "1px solid rgba(0,0,0,0.3)",
      minWidth: "100vw",
      boxShadow: "0px 3px 8px 1px rgba(0,0,0,0.41)",
    },
  })
);
function Books() {
  const dispatch = useDispatch();
  const columns = [
    { field: "id", headerName: "Id", width: 400, editable: true },
    { field: "title", headerName: "Title", width: 250 },
    { field: "subtitle", headerName: "Subtitle", width: 250 },
    { field: "header", headerName: "Header", width: 250 },
    { field: "body", headerName: "Body", width: 250 },
    { field: "status", headerName: "Status", width: 250 },
    { field: "genres", headerName: "Genres", width: 250 },
    { field: "warning_message", headerName: "Warning", width: 250 },
  ];

  const perms = useSelector<applicationState>(
    (state) => state.user.permissions
  ) as string[] | undefined;
  const globalLoading = useSelector<applicationState>(
    (st) => st.loading.loading
  ) as boolean;
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  const [openImages, setOpenImages] = React.useState<boolean>(false);
  const [openPaymentOptions, setOpenPaymentOptions] =
    React.useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery(getBooks, {
    fetchPolicy: "network-only",
  });
  const [deleteBook, delRes] = useMutation(deleteBookMutation);
  const [deleteBookImage, delImgRes] = useMutation(deleteBookImageMutation);
  const [addBookImage, imgRes] = useMutation(addBookImageMutation);
  const [addPaymentOptionMutation, addPaymentOptionRes] =
    useMutation(addBookPaymentOption);
  const [deletePaymentOptionMutation, paymentDelRes] = useMutation(
    deleteBookPaymentOption
  );
  const [flattenedBooks, setFlattenedBooks] = useState<any[] | undefined>();

  const [errors, setErrors] = useState<any[] | undefined>();
  const styles = useStyles();
  const handleOpenImages = () => {
    setOpenImages((prev) => !prev);
  };
  const handleOpenPaymentOptions = () => {
    setOpenPaymentOptions((prev) => !prev);
  };
  const handleImageAddition = (event: any) => {
    dispatch(setIsLoading(true));

    addBookImage({
      variables: { BookId: selectionModel[0], Image: event.target.files[0] },
    })
      .then((res) => {
        console.log(res);

        if (res.data && res.data.addBookImage) {
          refetch();
        }
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  const addPaymentOption = (image: any, url: string) => {
    console.log(url);

    dispatch(setIsLoading(true));
    addPaymentOptionMutation({
      variables: {
        paymentOption: {
          image,
          url,
        },
        bookId: selectionModel[0],
      },
    })
      .then((res) => {
        if (res.data && res.data.addBookPaymentOption) {
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  const deletePaymentOption = (id: string) => {
    dispatch(setIsLoading(true));
    deletePaymentOptionMutation({
      variables: {
        paymentId: id,
      },
    })
      .then((res) => {
        if (res.data && res.data.deletePaymentOption) {
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  const handleImageDeletion = (imageId: any) => {
    dispatch(setIsLoading(true));
    deleteBookImage({
      variables: {
        ImageId: imageId,
      },
    })
      .then((res) => {
        if (res.data.deleteBookImage) {
          refetch();
        }
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  const handleDelete = (id: string) => {
    dispatch(setIsLoading(true));
    deleteBook({
      variables: {
        bookId: id,
      },
    })
      .then((value) => {
        if (value.data && value.data.deleteBook) {
          const tempArr = flattenedBooks?.filter((el) => {
            return el.id !== id;
          });
          setFlattenedBooks(tempArr);
        }
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
  if (loading) {
    dispatch(setIsLoading(true));
  } else {
    dispatch(setIsLoading(false));
  }

  useEffect(() => {
    if (data && !loading) {
      if (data.getBooks.Books) {
        console.log(data.getBooks.Books);

        let tempObj = {};
        let flatArr = [] as any[];

        data.getBooks.Books.forEach((book: any) => {
          let status = "NaN";
          let bookGenres = "No Genres";

          if (book.status !== undefined) {
            status = getBookStatus(book.status) as string;
          }
          if (book.genres && book.genres.length > 0) {
            bookGenres = book.genres;
          }

          tempObj = {
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            header: book.header,
            body: book.body,
            status: status,
            genres: bookGenres,
            warning_message: book.warning_message,
          };
          flatArr.push(tempObj);
        });

        setFlattenedBooks(flatArr);
      } else if (data.getBooks.errors) {
        setErrors(data.getBooks.errors);
      }
    }
    return () => {};
  }, [loading]);

  return perms ? (
    <React.Fragment>
      <div className={styles.root}>
        <CustomToolbar perms={perms!} />
        {!error ? (
          !errors ? (
            <React.Fragment>
              <DataGrid
                rows={
                  flattenedBooks && flattenedBooks.length > 0
                    ? flattenedBooks
                    : [{ id: 1 }]
                }
                disableSelectionOnClick={false}
                columns={columns}
                pageSize={5}
                selectionModel={selectionModel}
                onSelectionModelChange={(selection, det) => {
                  const newSelectionModel = selection;

                  if (newSelectionModel.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = newSelectionModel.filter(
                      (s) => !selectionSet.has(s)
                    );
                    if (flattenedBooks && flattenedBooks!.length > 0) {
                      let currentBook = flattenedBooks.find(
                        (el) => el.Id === newSelectionModel[1]
                      );

                      dispatch(
                        setBook({
                          ...currentBook,
                          status: getBookReverseStatus(currentBook.status),
                        })
                      );
                    }
                    setSelectionModel(result);
                  } else {
                    if (newSelectionModel.length === 0) {
                      setSelectionModel(newSelectionModel);
                    } else {
                      setSelectionModel([newSelectionModel[0]]);

                      if (flattenedBooks && flattenedBooks!.length > 0) {
                        let currentBook = flattenedBooks.find(
                          (el) => el.id === newSelectionModel[0]
                        );

                        dispatch(
                          setBook({
                            ...currentBook,
                            status: getBookReverseStatus(currentBook.status),
                          })
                        );
                      }
                    }
                  }
                }}
              />

              {selectionModel &&
                selectionModel.length > 0 &&
                selectionModel.length < 2 && (
                  <Container
                    disableGutters={true}
                    className={styles.rowActions}
                  >
                    <DeleteButton
                      btnProps={{
                        style: { margin: "0 10px" },
                        disabled: !perms.includes("delete:books"),
                      }}
                      id={selectionModel[0].toString()}
                      handleDelete={handleDelete}
                    />
                    <Button
                      disabled={!perms!.includes("update:books")}
                      variant="outlined"
                      onClick={handleOpenImages}
                    >
                      Edit Images
                    </Button>
                    <Button
                      disabled={!perms!.includes("update:books")}
                      variant="outlined"
                      style={{ margin: "0 10px" }}
                      onClick={handleOpenPaymentOptions}
                    >
                      Edit Payment Options
                    </Button>
                    <EditButton
                      btnProps={{ style: { margin: "0 10px" } }}
                      perms={perms!}
                      uri="/books/update"
                    />
                  </Container>
                )}
            </React.Fragment>
          ) : (
            errors.map((err) => {
              return (
                <div>
                  <Typography>{err.field}</Typography>
                  <Typography>{err.message}</Typography>
                </div>
              );
            })
          )
        ) : (
          <Typography>{error.message}</Typography>
        )}
      </div>
      {data &&
        data.getBooks &&
        data.getBooks.Books &&
        selectionModel.length > 0 && (
          <React.Fragment>
            <PaymentOptions
              addPaymentOption={addPaymentOption}
              handleClose={handleOpenPaymentOptions}
              popoverState={openPaymentOptions}
              deletePaymentOption={deletePaymentOption}
              purchase_options={
                data.getBooks.Books?.find(
                  (el: any) => el.id === selectionModel[0].toString()
                ).purchase_options
              }
            />
            <Images
              handleImageAddition={handleImageAddition}
              open={openImages}
              handleImageRemoval={handleImageDeletion}
              handleClose={handleOpenImages}
              images={
                data.getBooks.Books?.find(
                  (el: any) => el.id === selectionModel[0].toString()
                ).images
              }
            />
          </React.Fragment>
        )}
    </React.Fragment>
  ) : (
    <Typography>no permissions</Typography>
  );
}

export default Books;
