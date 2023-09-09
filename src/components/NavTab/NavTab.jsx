import React from "react";
import "./navtab.css";

function NavTab() {
  return (
    <nav className="promo__nav">
      <a className="promo__link" href="#about">
        О проекте
      </a>
      <a className="promo__link" href="#techs">
        Технологии
      </a>
      <a className="promo__link" href="#student">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;
