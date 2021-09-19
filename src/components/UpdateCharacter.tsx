import { useMutation } from "@apollo/client";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { updateCharacterMutation } from "../api/Graphql/Mutations";
import { setIsLoading } from "../store/actions/loading";
import { updateCharacterValidator } from "../util/validation";
import CharacterForm from "./CharacterForm";

const UpdateCharacter = () => {
  const [updateCharacter, res] = useMutation(updateCharacterMutation);
  const dispatch = useDispatch();
  const [character, setCharacter] = useState<any>();
  const currentCharacter = useSelector<applicationState>(
    (state) => state.current.character
  ) as currentState;
  const loading = useSelector<applicationState>(
    (state) => state.loading.loading
  );
  useEffect(() => {
    if (currentCharacter) setCharacter(currentCharacter);

    return () => {};
  }, [currentCharacter]);
  console.log(currentCharacter);

  async function UpdateCharacterHandler(values: any): Promise<void> {
    console.log(values.category);
    if (values.category === "none") {
      updateCharacter({
        variables: {
          updateCharacterInput: {
            ...values,
            category: undefined,
          },
        },
      });
    } else {
      updateCharacter({
        variables: {
          updateCharacterInput: {
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
      {character ? (
        <CharacterForm
          handler={UpdateCharacterHandler}
          validationSchema={updateCharacterValidator}
          character={character}
        />
      ) : (
        <Typography>there is no book to edit!</Typography>
      )}

      {!loading && res.data && res.data.updateCharacter.character && (
        <Redirect to="/character" />
      )}
      {!loading &&
        res.data &&
        res.data.updateCharacter.errors &&
        res.data.updateCharacter.errors.map(
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

export default UpdateCharacter;
