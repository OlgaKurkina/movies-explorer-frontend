import React from "react";
import { useLocation } from "react-router-dom";
import "./searchForm.css";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function SearchForm({
  searchForm,
  setSearchForm,
  onCheckbox,
  searchMovies,
  shortDurationCheckbox,
  savedShortDurationCheckbox,
}) {
  const location = useLocation();

  function handleSearch(evt) {
    evt.preventDefault();
    searchMovies();
  }

  function handleChange(evt) {
    setSearchForm(evt.target.value);
  }

  return (
    <section className="search-section">
      <form className="search-form">
        <input
          className="search-form__input"
          type="text"
          name="searh__input"
          id="searh__input"
          placeholder="Фильм"
          required
          minLength={2}
          maxLength={20}
          value={searchForm}
          onChange={handleChange}
        ></input>

        <button
          className="search-form__button"
          type="submit"
          name="submit"
          id="submit"
          onClick={handleSearch}
        >
          Найти
        </button>
        <FilterCheckbox
          onCheckbox={onCheckbox}
          shortMovieCheckbox={
            location.pathname === "/movies"
              ? shortDurationCheckbox
              : savedShortDurationCheckbox
          }
        />
      </form>
    </section>
  );
}
