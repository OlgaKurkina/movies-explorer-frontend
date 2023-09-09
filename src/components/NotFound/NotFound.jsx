import React from "react";
import "./notFound.css";

function NotFound({ onGoBack }) {
  return (
    <main className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__text">Страница не найдена</p>
      <button className="page-not-found__link" type="button" onClick={onGoBack}>
        Назад
      </button>
    </main>
  );
}

export default NotFound;
