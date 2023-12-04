import React, { useEffect } from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";
import "./movies.css";

export default function Movies({
  movies,
  preloader,
  onLike,
  onDelete,
  checkingLike,
  searchMovies,
  setFilterMovies,
  setSearchForm,
  searchForm,
  shortDurationCheckbox,
  errorMessage,
  onCheckbox,
  resetSearchMovies,
}) {
  useEffect(() => {
    return () => {
      resetSearchMovies();
      if (!shortDurationCheckbox) searchMovies();
    };
  }, []);
  return (
    <main className="page">
      <SearchForm
        searchMovies={searchMovies}
        setFilterMovies={setFilterMovies}
        setSearchForm={setSearchForm}
        searchForm={searchForm}
        onCheckbox={onCheckbox}
        shortDurationCheckbox={shortDurationCheckbox}
      />
      {preloader ? (
        <Preloader />
      ) : (
        <MovieCardList
          movies={movies}
          onLike={onLike}
          onDelete={onDelete}
          checkingLike={checkingLike}
          errorMessage={errorMessage}
        />
      )}
    </main>
  );
}
