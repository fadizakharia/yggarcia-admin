// import React from "react";

import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid, Toolbar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { getCategoriesQuery, getCharactersQuery } from "../api/Graphql/Queries";
import CharacterGrid from "./CharacterGrid";
import { Pagination, Skeleton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Categories";
import {
  addCategoryMutation,
  addCharacterImageMutation,
  deleteCategoryMutation,
  deleteCharacterImageMutation,
  deleteCharacterMutation,
} from "../api/Graphql/Mutations";
import { useHistory } from "react-router";
import { setCharacter } from "../store/actions/current";
import Images from "./Images";
const Character = () => {
  const history = useHistory();
  const DEFAULT_PER_PAGE = 10;
  const DEFAULT_PAGE = 1;
  const { data, loading, error, refetch } = useQuery(getCharactersQuery, {
    fetchPolicy: "network-only",
  });
  const categoriesQuery = useQuery(getCategoriesQuery, {
    fetchPolicy: "network-only",
  });
  const [addCategory, addCategoryRes] = useMutation(addCategoryMutation);
  const [deleteCategory, deleteCategoryRes] = useMutation(
    deleteCategoryMutation
  );
  const [addCharacterImage, addCharImageRes] = useMutation(
    addCharacterImageMutation
  );
  const [deleteCharacterImage, deleteCharImageRes] = useMutation(
    deleteCharacterImageMutation
  );
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openCharacterImages, setOpenCharacterImages] =
    useState<boolean>(false);
  const [images, setImages] = useState<characterState["images"]>();
  const [currentCharacterId, setCurrentCharacterId] =
    useState<characterState["id"]>();
  const dispatch = useDispatch();
  const [deleteCharacters, delres] = useMutation(deleteCharacterMutation);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [step, setStep] = useState(DEFAULT_PER_PAGE);

  const perms = useSelector<applicationState>(
    (state) => state.user.permissions
  ) as applicationState["user"]["permissions"];
  const handleAddCategory = (title: string) => {
    addCategory({
      variables: {
        title,
      },
    }).then((res) => {
      categoriesQuery.refetch();
    });
  };
  const handleDeleteCategory = (id: string) => {
    deleteCategory({
      variables: {
        catId: id,
      },
    }).then((res) => {
      categoriesQuery.refetch();
    });
  };
  const handleCategoryOpen = () => {
    if (perms.includes("update:character"))
      setOpenCategories((prevState) => !prevState);
    console.log(openCategories);
  };
  const handleCharacterUpdate = (values: any) => {
    console.log(values);

    dispatch(setCharacter(values));
    history.push("character/update");
  };

  const handleDeleteCharacter = (id: string) => {
    deleteCharacters({
      variables: {
        id,
      },
    }).then((value) => {
      refetchCharacters(0, step);
    });
  };
  const handleAdminRedirect = (permReq: string) => {
    if (perms.includes(permReq)) {
      const reqPermArr = permReq.split(":");
      history.push(`${reqPermArr[1]}/${reqPermArr[0]}`);
    }
  };
  const handleImageAddition = (event: any) => {
    console.log(currentCharacterId, event.target.files[0]);
    if (currentCharacterId) {
      addCharacterImage({
        variables: { charId: currentCharacterId, Image: event.target.files[0] },
      }).then((res) => {
        console.log(res);

        if (res.data && res.data.addBookImage) {
          refetchCharacters(0, step);
        }
      });
    }
  };
  const handleImageDeletion = (imageId: any) => {
    deleteCharacterImage({
      variables: {
        imageId: imageId,
      },
    }).then((res) => {
      if (res.data.deleteBookImage) {
        refetchCharacters(0, step);
      }
    });
  };
  const handleOpenImages = (values: any) => {
    setImages(values.images);
    setCurrentCharacterId(values.id);
    setOpenCharacterImages(true);
  };
  const handleCloseImages = () => {
    setImages(undefined);
    setCurrentCharacterId(undefined);
    setOpenCharacterImages(false);
  };
  const handlePagination = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => {
    setPage(value);
    refetchCharacters(value - 1, step);
  };
  const refetchCharacters = (page = DEFAULT_PAGE, step = DEFAULT_PER_PAGE) => {
    refetch!({
      page,
      step,
    });
  };

  console.log(data);

  return (
    <React.Fragment>
      <Toolbar style={{ marginTop: "30px" }}>
        <div style={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "0 20px" }}
          onClick={handleCategoryOpen}
          disabled={!perms.includes("update:character")}
        >
          Edit Categories
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAdminRedirect("add:character")}
          disabled={!perms.includes("add:character")}
        >
          Add Character
        </Button>
      </Toolbar>
      {data && !loading && !error ? (
        <React.Fragment>
          <CharacterGrid
            handleOpenImages={handleOpenImages}
            editHandler={handleCharacterUpdate}
            perms={perms}
            deleteHandler={handleDeleteCharacter}
            characters={data.getCharacters.characters}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "30px 0",
            }}
          >
            <Pagination
              color="primary"
              page={page}
              onChange={(ev: any, page) => handlePagination(ev, page)}
              count={Math.ceil(data.getCharacters.total / 10)}
            />
          </div>
        </React.Fragment>
      ) : (
        <Typography>{error?.message}</Typography>
      )}
      {loading && (
        <Grid container>
          {new Array(10).fill("").map((el) => {
            <Grid item xs={12} sm={4}>
              <Skeleton variant="rect" width={300} height={300} />;
            </Grid>;
          })}
        </Grid>
      )}
      {error && (
        <Typography align="center" variant="body1" color="error">
          {error.message}
        </Typography>
      )}
      {!categoriesQuery.loading && !categoriesQuery.error && (
        <Categories
          handleClose={handleCategoryOpen}
          open={openCategories}
          categories={categoriesQuery.data.getCategories}
          handleAddition={handleAddCategory}
          handleDelete={handleDeleteCategory}
        />
      )}
      <Images
        handleClose={handleCloseImages}
        open={openCharacterImages}
        images={images || []}
        handleImageAddition={handleImageAddition}
        handleImageRemoval={handleImageDeletion}
      />
    </React.Fragment>
  );
};

export default Character;
