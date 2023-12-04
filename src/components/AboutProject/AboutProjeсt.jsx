import React from "react";
import "./aboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <a id="about"></a>
      <h2 className="section-title">О проекте</h2>
      <ul className="about-project__content">
        <li className="about-project__item">
          <h3 className="about-project__info">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li>
          <h3 className="about-project__info">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было{" "}
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__timeline">
        <li className="about-project__element">
          <p className="about-project__list-title">1 неделя</p>
          <p className="about-project__list">Back-end</p>
        </li>
        <li className="about-project__element">
          <p className="about-project__list-title about-project__list-title_theme_light">
            4 недели
          </p>
          <p className="about-project__list">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
