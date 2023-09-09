import React from "react";
import MovieCard from "../MovieCard/MovieCard";

import "./movieCardList.css";

export default function MovieCardList() {
  return (
    <section className="movies">
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
  );
}
