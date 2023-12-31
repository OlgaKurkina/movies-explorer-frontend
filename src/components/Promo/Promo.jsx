import React from "react";
import landingLogo from "../../images/landing-logo.svg";
import "./promo.css";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className="promo__content">
          <p className="promo__description">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="promo__link" href="#about">
            Узнать больше
          </a>
        </div>
        <img
          className="promo__image"
          src={landingLogo}
          alt="Картинка земного шара"
        />
      </div>
    </section>
  );
}
