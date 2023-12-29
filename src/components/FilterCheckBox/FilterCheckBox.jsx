import React from "react";
import "./filterCheckbox.css";

const FilterCheckbox = ({ onCheckbox, shortDurationCheckbox }) => {
  return (
    <label className="checkbox">
      <input
        className="checkbox__input"
        type="checkbox"
        name="short-films"
        onChange={onCheckbox}
        checked={shortDurationCheckbox}
      />
      <span className="checkbox__name">Короткометражки</span>
    </label>
  );
};

export default FilterCheckbox;
