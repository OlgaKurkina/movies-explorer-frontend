import React from "react";
import { useNavigate } from "react-router-dom";
import "./notFound.css";

function NotFound() {
  const navigate = useNavigate();

  const onBackPage = () => {
    navigate(-1);
  };

  return (
    <main className="page-not-found">
      <section className="page-not-found__section">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">Страница не найдена</p>
        <button
          className="page-not-found__link"
          type="button"
          onClick={onBackPage}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
