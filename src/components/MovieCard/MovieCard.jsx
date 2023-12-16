import React from "react";
import { useLocation } from "react-router-dom";
import "./movieCard.css";

function MovieCard({
  movie,
  onLike,
  onDelete,
  handleLike,
  savedMovies,
  isSaved,
}) {

  return (
    <li className="movie">
      <div className="movie__content">
        <a
          className="movie__trailer"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="movie__image"
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${movie.image.url}`
                : movie.image
            }
            alt={movie.nameRU}
          />
        </a>
        <h2 className="movie__name">{movie.nameRU}</h2>
        <p className="movie__duration">{duration(movie.duration)}</p>
        <div className="movie__like-container">
          {!isSaved ? (
            <button
              className= "movie__like-btn_active" : "movie__like-btn"
              type="button"
             
            ></button>
          ) : (
            <button
              className="movie__delete-btn"
              type="button"
             
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}
export default MovieCard;
