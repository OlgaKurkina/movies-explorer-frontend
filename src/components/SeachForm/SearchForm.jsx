import React from "react";
import "./searchForm.css";
import FilterCheckbox from "../FilterCheckBox/FilterCheckBox";

export default function SearchForm({ onCheckbox, shortMovieCheckbox }) {
  return (
    <section className="search-form__section">
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
        ></input>

        <button
          className="search-form__button"
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
    </section>
  );
}
