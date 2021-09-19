import { useMutation } from "@apollo/client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCharacterMutation } from "../api/Graphql/Mutations";
import { setIsLoading } from "../store/actions/loading";
import CharacterForm from "./CharacterForm";
import { createCharacterValidator } from "../util/validation";
import { Redirect } from "react-router";
import { Typography } from "@material-ui/core";
function AddCharacter() {
  const [addCharacter, res] = useMutation(addCharacterMutation);
  const dispatch = useDispatch();
  const loading = useSelector<applicationState>(
    (state) => state.loading.loading
  );

  async function addCharacterHandler(values: any): Promise<void> {
    console.log(values.category);

    if (values.category === "none") {
      addCharacter({
        variables: {
          addCharacterInput: {
            ...values,
            category: undefined,
          },
        },
      });
    } else {
      addCharacter({
        variables: {
          addCharacterInput: {
            ...values,
          },
        },
      });
    }
  }

  if (res.loading) {
    dispatch(setIsLoading(true));
  } else {
    dispatch(setIsLoading(false));
  }

  return (
    <React.Fragment>
      <CharacterForm
        handler={addCharacterHandler}
        validationSchema={createCharacterValidator}
      />

      {!loading && res.data && res.data.createCharacter.character && (
        <Redirect to="/character" />
      )}
      {!loading &&
        res.data &&
        res.data.createCharacter.errors &&
        res.data.createCharacter.errors.map(
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
}

export default AddCharacter;
