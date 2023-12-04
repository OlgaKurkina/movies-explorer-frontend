import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Movie from "../../images/movie.png";
import "./movieCard.css";

function MovieCard(movie) {
  const currentUser = React.useContext(CurrentUserContext);
  //const isOwn = movie.owner._id === currentUser._id;
  //const isLiked = movie.likes.some((i) => i._id === currentUser._id);
  return (
    <li className="movie">
      <div className="movie__content">
        <img className="movie__image" src={Movie} alt={Movie.nameRU} />
        <h2 className="movie__name">33 слова о дизайне</h2>
        <p className="movie__duration">1ч 47м</p>
        <div className="movie__like-container">
          <button className="movie__like-btn" type="button"></button>
        </div>
      </div>
    </li>
  );
}
export default MovieCard;
