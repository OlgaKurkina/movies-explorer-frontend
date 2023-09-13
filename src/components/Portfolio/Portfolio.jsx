import React from "react";
import arrowLanding from "../../images/arrow-landing.svg";
import "./portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio__container">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__element">
          <p className="portfolio__text">Статичный сайт</p>
          <a
            href="https://olgakurkina.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__img"
              src={arrowLanding}
              alt="ссылка на сайт"
            ></img>
          </a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__text">Адаптивный сайт</p>
          <a
            href="https://olgakurkina.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__img"
              src={arrowLanding}
              alt="ссылка на сайт"
            ></img>
          </a>
        </li>
        <li className="portfolio__element">
          <p className="portfolio__text">Одностраничное приложение</p>
          <a
            href="http://doktorovao.nomoreparties.sbs"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="portfolio__img"
              src={arrowLanding}
              alt="ссылка на сайт"
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
}
