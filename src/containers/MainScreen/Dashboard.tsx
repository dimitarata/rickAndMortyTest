import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AppBarComponent from "../../components/AppBarComponent/AppBarComponent";
import StatusFilterComponent from "../../components/StatusFilterComponent/StatusFilterComponent";
import Characters from "../../components/GridComponent/CharactersComponent";

const Dashboard = () => {
  const [characters, setCharacters] = useState<String[]>([]);
  const [nextFetch, setNextFetch] = useState();
  const [search, setSearch] = useState<String | null>();
  const [filter, setFilter] = useState<String | null>();
  const [isLoading, setIsLoading] = useState(false);


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

  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (nextFetch) {
        fetchCharacters();
      } else {
        return;
      }
    }
  };
  const fetchCharacters = () => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="mainDivStyle">
        <AppBarComponent handleSearchChange={handleSearchChange} />
        <StatusFilterComponent handleFilterChange={handleFilterChange} filter={filter} />
        <Characters characters={characters} isLoading={isLoading}/>
        </div>
    </>
  );
};

export default Dashboard;
