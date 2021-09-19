import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CharacterGridCharacter from "./CharacterGridCharacter";
interface characterGridProps {
  characters: Array<characterState>;
  deleteHandler: (id: string) => void;
  perms: applicationState["user"]["permissions"];
  editHandler: (values: any) => void;
  handleOpenImages: (values: any) => void;
}
const CharacterGrid: React.FC<characterGridProps> = (props) => {
  const [characters, setCharacters] = useState<characterState[]>();
  useEffect(() => {
    setCharacters(props.characters);
  }, [...props.characters]);

  console.log(characters);

  return (
    <Grid style={{ padding: "10px" }} container spacing={2}>
      {characters &&
        characters?.length > 0 &&
        characters.map((character) => {
          return (
            <CharacterGridCharacter
              handleOpenImages={props.handleOpenImages}
              editHandler={props.editHandler}
              key={character.id}
              perms={props.perms}
              deleteHandler={props.deleteHandler}
              character={character}
            />
          );
        })}
    </Grid>
  );
};

export default CharacterGrid;
