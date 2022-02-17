import React from "react";
import { Grid } from "@mui/material";
import { InterfaceCharacter } from "../../type/character";

interface CharactersProps {
  characters: InterfaceCharacter[];
  isLoading: boolean;
}

export default function CharactersList({ characters, isLoading }: CharactersProps) {
  return (
    <>
      <div className="gridWrapperDiv">
        <Grid container>
          {characters.map((character) => {
            return (
              <Grid
                className="gridItem"
                item
                sm={12}
                md={6}
                lg={3}
                key={character.id}
              >
                <div className="itemWrapperDiv">
                  <img
                    className="itemImage"
                    id={character.id + character.name}
                    src={character.image}
                    alt={character.name}
                  ></img>
                  <div className="nameWrapperDiv">
                    <h2>{character.name}</h2>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      {isLoading && <h3>Loading...</h3>}
    </>
  );
};
