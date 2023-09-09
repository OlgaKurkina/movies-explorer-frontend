import React from "react";
import SearchForm from "../SeachForm/SearchForm";
import MovieCard from "../MovieCard/MovieCard";

export default function SavedMovies() {
  return (
    <main className="page">
      <section className="movies">
        <SearchForm />
        <ul className="movies__list">
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </ul>
        <div className="movie__add-container">
          <button className="movie__add-btn" type="button">
            Еще
          </button>
        </div>
      </section>
    </main>
  );
}
