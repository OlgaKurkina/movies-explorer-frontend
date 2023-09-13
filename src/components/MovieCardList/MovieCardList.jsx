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
      <div className="movies__add-container">
        <button className="movies__add-btn" type="submit">
          Еще
        </button>
      </div>
    </section>
  );
}
