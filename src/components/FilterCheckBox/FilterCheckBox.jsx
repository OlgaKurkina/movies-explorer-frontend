import React from "react";
import "./filterCheckbox.css";

const FilterCheckbox = ({ onCheckbox, shortMovieCheckbox }) => {
  return (
    <label className="label-checkbox">
      <input
        className="checkbox"
        type="radio"
        name="short-films"
        onChange={onCheckbox}
        checked={shortMovieCheckbox}
      />
      <span className="checkbox__name">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
