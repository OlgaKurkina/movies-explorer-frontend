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
  const location = useLocation();
  const isLiked = handleLike(savedMovies, movie);

  function duration(movieDuration) {
    const hours = Math.floor(movieDuration / 60);
    const minutes = movieDuration % 60;
    return `${hours}ч${minutes}м`;
  }

  function handleLikeClick(evt) {
    evt.preventDefault();
    if (isLiked) {
      onDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onLike(movie);
    }
  }

  function handleDelete() {
    onDelete(movie);
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
              className={isLiked ? "movie__like-btn_active" : "movie__like-btn"}
              type="button"
              onClick={handleLikeClick}
            ></button>
          ) : (
            <button
              className="movie__delete-btn"
              type="button"
              onClick={handleDelete}
            ></button>
          )}
        </div>
      </div>
    </li>
  );
}
export default MovieCard;
