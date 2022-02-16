import React from 'react';
import { Grid } from "@mui/material";


interface CharactersProps {
    characters: String[];
    isLoading: Boolean;
}

const Characters = (props:CharactersProps) => {
  return (
      <>
    <div className="gridWrapperDiv">
          <Grid container spacing={0}>
            {props.characters.map((character: any) => {
              return (
                <Grid
                  className="gridItem"
                  item
                  id={character.id}
                  sm={12}
                  md={6}
                  lg={3}
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
        {props.isLoading ? <h3>Loading...</h3> : null}
        </>
  )
}

export default Characters