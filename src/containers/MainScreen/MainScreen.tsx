import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MainScreen = () => {
  const [characters, setCharacters] = useState([] as any);
  const [nextFetch, setNextFetch] = useState();
  const [search, setSearch] = useState<String | null>();
  const [filter, setFilter] = useState<String | null>();

  // useEffect(() => {
  //   fetchCharacters();
  // }, []);

  useEffect(() => {
    refresh();
  }, [search, filter]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "any") {
      setFilter(null);
    } else {
      setFilter((event.target as HTMLInputElement).value);
    }
  };

  const refresh = () => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character?${
          search && filter
            ? `name=${search}&status=${filter}`
            : !search && filter
            ? `status=${filter}`
            : search && !filter
            ? `name=${search}`
            : ""
        }
    `
      )
      .then((res) => {
        setCharacters(res.data.results);
        setNextFetch(res.data.info.next);
      });
  };

  const fetchCharacters = () => {
    axios
      .get(
        `${
          nextFetch
            ? nextFetch
            : nextFetch && filter && search
            ? nextFetch + `&name=${search}&status=${filter}`
            : nextFetch && filter
            ? nextFetch + `status=${filter}`
            : nextFetch && search
            ? nextFetch + `&name=${search}`
            : search && filter
            ? `https://rickandmortyapi.com/api/character?name=${search}&status=${filter}`
            : search
            ? `https://rickandmortyapi.com/api/character?name=${search}`
            : filter
            ? `https://rickandmortyapi.com/api/character?status=${filter}`
            : "https://rickandmortyapi.com/api/character"
        }`
      )
      .then((res) => {
        if (nextFetch) {
          setCharacters([...characters, ...res.data.results]);
        } else {
          setCharacters(res.data.results);
        }
        setNextFetch(res.data.info.next);
      });
  };

  return (
    <InfiniteScroll
      dataLength={characters.length} //This is important field to render the next data
      next={fetchCharacters}
      hasMore={true}
      loader="Loading..."
      // below props only if you need pull down functionality
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 className="textAlignCenter">&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 className="textAlignCenter">&#8593; Release to refresh</h3>
      }
    >
      <div className="mainDivStyle">
        <AppBar position="static">
          <Toolbar>
            <img
              src={require("../../assets/apilogo.png")}
              height={"80px"}
              alt="apilogo"
            ></img>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                src={require("../../assets/logo.png")}
                height={"80px"}
                alt="logo"
              ></img>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleSearchChange}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <FormControl className="formControlStyle">
          <div className="flexDivRow">
            <div className="label">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Character status:
              </FormLabel>
            </div>
            <div>
              <RadioGroup
                value={filter}
                onChange={handleFilterChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="any" control={<Radio />} label="Any" />
                <FormControlLabel
                  value="alive"
                  control={<Radio />}
                  label="Alive"
                />
                <FormControlLabel
                  value="dead"
                  control={<Radio />}
                  label="Dead"
                />
                <FormControlLabel
                  value="unknown"
                  control={<Radio />}
                  label="unknown"
                />
              </RadioGroup>
            </div>
          </div>
        </FormControl>
        <div className="gridWrapperDiv">
          <Grid container spacing={0}>
            {characters.map((character: any) => {
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
                    <div
                      className="nameWrapperDiv"
                    >
                      <h2>{character.name}</h2>
                    </div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default MainScreen;
