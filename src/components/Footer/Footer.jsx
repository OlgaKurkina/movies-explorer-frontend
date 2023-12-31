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
        <ul className="footer__links">
          <li>
            <a
              href="https://practicum.yandex.ru"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
