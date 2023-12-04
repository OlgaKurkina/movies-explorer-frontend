import React from "react";
import { useLocation } from "react-router-dom";
import "./movieCard.css";

function MovieCard({ movie, onLike, onDelete, checkingLike }) {
  const path = useLocation().pathname;
  const isLiked = checkingLike(movie);

  function duration(movieDuration) {
    const hours = Math.floor(movieDuration / 60);
    const minutes = movieDuration % 60;
    return `${hours}ч${minutes}м`;
  }

  function handleLike(evt) {
    evt.preventDefault();
    isLiked ? onDelete(movie) : onLike(movie);
  }

  return (
    <li className="movie">
      <div className="movie__content">
        <a
          className="movie__trailer"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img className="movie__image" src={movie.image} alt={movie.nameRU} />
        </a>
        <h2 className="movie__name">{movie.nameRU}</h2>
        <p className="movie__duration">{duration(movie.duration)}</p>
        <div className="movie__like-container">
          {path === "/movies" ? (
            <button
              className={isLiked ? "movie__like-btn_active" : "movie__like-btn"}
              type="button"
              onClick={handleLike}
            ></button>
          ) : (
            <button
              className="movie__delete-btn"
              type="button"
              onClick={handleLike}
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}
export default MovieCard;
