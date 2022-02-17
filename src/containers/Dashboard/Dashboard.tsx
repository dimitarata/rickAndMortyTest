import Header from "../../components/Header/Header";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import CharactersList from "../../components/CharactersList/CharactersList";
import useCharacters from "./useCharacters";
import { useEffect } from "react";

const OFFSET_LIMIT = 5;

const Dashboard = () => {
  const {
    handleSearchChange,
    handleFilterChange,
    fetchCharacters,
    query,
    characters,
    isLoading,
  } = useCharacters();

  useEffect(() => {

    const onScrollFetch = () => {
      if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - OFFSET_LIMIT)) {
        fetchCharacters();
      }
    }

    window.addEventListener('scroll', onScrollFetch)
    return () => window.removeEventListener('scroll', onScrollFetch)
  }, [fetchCharacters])

  return (
    <>
      <div className="mainDivStyle">
        <Header handleSearchChange={handleSearchChange} />
        <StatusFilter
          handleFilterChange={handleFilterChange}
          filter={query.status}
        />
        <CharactersList characters={characters} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Dashboard;
