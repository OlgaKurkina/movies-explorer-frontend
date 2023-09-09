import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__subtitle">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__info">
        <p className="footer__copyright">&copy;2023</p>
        <nav className="footer__links">
          <a
            href="https://practicum.yandex.ru"
            className="footer__link"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="footer__link"
            target="_blank"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
