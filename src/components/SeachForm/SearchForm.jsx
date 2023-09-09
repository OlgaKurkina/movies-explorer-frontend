import React from "react";
import "./searchForm.css";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function SearchForm({ onCheckbox, shortMovieCheckbox }) {
  return (
    <form className="search-form">
      <input
        className="searh__input"
        type="text"
        name="searh__input"
        id="searh__input"
        placeholder="Фильм"
      ></input>

      <button
        className="search__button"
        type="submit"
        name="submit"
        id="submit"
      >
        Найти
      </button>
      <FilterCheckbox
        onCheckbox={onCheckbox}
        shortMovieCheckbox={shortMovieCheckbox}
      />
    </form>
  );
}
