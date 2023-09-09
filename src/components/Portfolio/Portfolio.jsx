import React from "react";
import arrowLanding from "../../images/arrow-landing.png";
import "./portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio__container">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <p className="portfolio__text">Статичный сайт</p>
          <img
            className="portfolio__img"
            src={arrowLanding}
            alt="ссылка на сайт"
          ></img>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__text">Адаптивный сайт</p>
          <img
            className="portfolio__img"
            src={arrowLanding}
            alt="ссылка на сайт"
          ></img>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__text">Одностраничное приложение</p>
          <img
            className="portfolio__img"
            src={arrowLanding}
            alt="ссылка на сайт"
          ></img>
        </li>
      </ul>
    </section>
  );
}
