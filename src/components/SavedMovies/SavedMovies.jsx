import React, { useEffect } from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  movies,
  preloader,
  onLike,
  onDelete,
  handleLike,
  searchMovies,
  setSearchForm,
  searchForm,
  resetSearchSavedMovies,
  errorMessage,
  onCheckbox,
  savedMovies,
  savedShortDurationCheckbox,
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
            handleLike={handleLike}
            errorMessage={errorMessage}
            savedMovies={savedMovies}
            isSaved={true}
          />
        )}
      </section>
    </main>
  );
}
