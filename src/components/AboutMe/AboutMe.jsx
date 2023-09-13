import React from "react";
import Portfolio from "../Portfolio/Portfolio";
import photo from "../../images/photo.png";
import "./aboutMe.css";

export default function AboutMe() {
  return (
    <section className="aboutme__section">
      <a name="student"></a>
      <h2 className="section__title">Студент</h2>
      <div className="aboutme__container">
        <h3 className="aboutme__name">Ольга</h3>
        <p className="aboutme__description">Фронтенд разработчик, 37 лет</p>
        <p className="aboutme__text">
          Я родилась и живу в Москве, закончила экономический факультет МГПУ.
          Летом люблю кататься на велосипеде и путешествовать, а зимой на
          беговых и горных лыжах. Прошла курс Веб-разработчик в Яндекс.Практикум
          и теперь хочу развиваться в этом направлении.
        </p>
        <img className="aboutme__photo" src={photo} alt="Фотография студента" />
        <a
          className="aboutme__link"
          href="https://github.com/OlgaKurkina"
          target="_blank"
        >
          Github
        </a>
      </div>
      <Portfolio />
    </section>
  );
}
