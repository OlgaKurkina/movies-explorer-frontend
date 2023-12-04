import React, { useEffect } from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  movies,
  preloader,
  onLike,
  onDelete,
  checkingLike,
  searchMovies,
  setFilterMovies,
  setSearchForm,
  searchForm,
  savedShortDurationCheckbox,
  resetSearchSavedMovies,
  errorMessage,
  onCheckbox,
}) {
  useEffect(() => {
    return () => {
      resetSearchSavedMovies();
      if (!savedShortDurationCheckbox) searchMovies();
    };
  }, []);

  return (
    <main className="page">
      <section className="movies">
        <SearchForm
          searchMovies={searchMovies}
          setFilterMovies={setFilterMovies}
          setSearchForm={setSearchForm}
          searchForm={searchForm}
          onCheckbox={onCheckbox}
          savedShortDurationCheckbox={savedShortDurationCheckbox}
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
      </section>
    </main>
  );
}
