import React from "react";
import "./techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <a name="techs"></a>
      <h2 className="section__title">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__element">HTML</li>
        <li className="techs__element">CSS</li>
        <li className="techs__element">JS</li>
        <li className="techs__element">React</li>
        <li className="techs__element">Git</li>
        <li className="techs__element">Express.js</li>
        <li className="techs__element">MongoDB</li>
      </ul>
    </section>
  );
}
