import { useEffect, useState } from "react";

import axios from "../../axios/axiosInstance";
import { generateQuery } from "../../helpers";
import { InterfaceCharacter } from "../../type/character";

export default function useCharacters() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<InterfaceCharacter[] | []>([]);

  const [query, setQuery] = useState({
    name: "",
    status: "",
    page: 1,
  });

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(`/character${generateQuery(query)}`);
      setCharacters(data.results);
    })();

    //eslint-disable-next-line
  }, [query.name, query.status]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((p) => ({
      ...p,
      name: event.target.value,
      page: 1,
    }));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((p) => ({
      ...p,
      status: event.target.value,
      page: 1,
    }));
  };

  const fetchCharacters = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const page = query.page + 1;
    const { data } = await axios.get(
      `/character${generateQuery({ ...query, page })}`
    );
    setCharacters([...characters, ...data.results]);

    setIsLoading(false);
    setQuery((p) => ({
      ...p,
      page,
    }));
  };

  return {
    handleSearchChange,
    handleFilterChange,
    fetchCharacters,
    query,
    characters,
    isLoading,
  };
}
