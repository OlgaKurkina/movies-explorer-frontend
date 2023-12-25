import React from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";
import "./movies.css";

export default function Movies({
  movies,
  preloader,
  onLike,
  onDelete,
  handleLike,
  searchMovies,
  setSearchForm,
  searchForm,
  shortDurationCheckbox,
  errorMessage,
  onCheckbox,
  savedMovies,
}) {
  return (
    <main className="page">
      <SearchForm
        searchMovies={searchMovies}
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
          handleLike={handleLike}
          errorMessage={errorMessage}
          savedMovies={savedMovies}
          isSaved={false}
        />
      )}
    </main>
  );
}
