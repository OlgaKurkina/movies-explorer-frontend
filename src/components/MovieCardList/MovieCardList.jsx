import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./movieCardList.css";

export default function MovieCardList({
  movies,
  onLike,
  onDelete,
  handleLike,
  errorMessage,
  savedMovies,
  isSaved,
}) {
  return (
    <section className="movies">
      <span className="movies__error-message">{errorMessage}</span>
      <ul className="movies__list">
        <MovieCard key={isSaved ? movie._id : movie.id} movie={movie} />
      </ul>
      <div className="movies__add-container">
        <button className="movies__add-btn" type="submit">
          Еще
        </button>
      </div>
    </section>
  );
}
