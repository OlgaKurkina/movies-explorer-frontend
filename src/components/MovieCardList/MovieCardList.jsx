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
  const location = useLocation();
  const [moviesToAdd, setMoviesToAdd] = useState(0);

  useEffect(() => {
    setMoviesToAdd(0);
  }, [movies]);

  function useResize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const getSize = () =>
        setSize({ width: window.innerWidth, height: window.innerHeight });

      getSize();

      window.addEventListener("resize", getSize);
      return () => window.removeEventListener("resize", getSize);
    }, []);

    return size;
  }

  const size = useResize();

  const moviesToShow = useMemo(() => {
    const countToShow = size.width < 768 ? 5 : size.width < 1160 ? 8 : 12;

    return movies.slice(0, countToShow + moviesToAdd);
  }, [movies, moviesToAdd, size]);

  return (
    <section className="movies">
      <span className="movies__error-message">{errorMessage}</span>
      <ul className="movies__list">
        {moviesToShow.map((movie) => (
          <MovieCard
            key={isSaved ? movie._id : movie.id}
            movie={movie}
            onLike={onLike}
            onDelete={onDelete}
            handleLike={handleLike}
            savedMovies={savedMovies}
            isSaved={isSaved}
          />
        ))}
      </ul>
      <div className="movies__add-container">
        {location.pathname === "/movies" &&
          movies.length > moviesToShow.length && (
            <button
              onClick={() => {
                setMoviesToAdd((data) => data + (size.width >= 1125 ? 3 : 2));
              }}
              className="movies__add-btn"
              type="submit"
            >
              Еще
            </button>
          )}
      </div>
    </section>
  );
}
