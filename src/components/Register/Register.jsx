import React from "react";
import Logo from "../../images/header-logo.svg";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

import "./register.css";

const Register = ({ onRegister, onLoading, errorUserDataMessage }) => {
  return (
    <>
      <main className="content">
        <section className="register">
          <Link to="/" className="link link_place_register">
            <img
              className="logo logo_place_register"
              src={Logo}
              alt="Логотип"
            />
          </Link>
          <h1 className="wellcome">Добро пожаловать!</h1>
        </section>
        <form className="register-form">
          <label className="label label_place_register">
            Имя
            <input
              className="input"
              type="text"
              name="name"
              id="register-name"
              required
              minLength={2}
              maxLength={20}
              placeholder="Имя"
              value={formValue.name || ""}
            />
          </label>
          <span className="error error_place_register">{error.name || ""}</span>
          <label className="label label_place_register">
            E-mail
            <input
              className="input"
              type="email"
              name="email"
              id="register-email"
              required
              minLength={2}
              maxLength={20}
              placeholder="Email"
              value={formValue.email || ""}
            />
          </label>
          <span className="error error_place_register">
            {error.email || ""}
          </span>
          <label className="label label_place_register">
            Пароль
            <input
              className="input"
              type="password"
              name="password"
              id="register-password"
              required
              minLength={4}
              maxLength={20}
              placeholder="Пароль"
              value={formValue.password || ""}
            />
          </label>
          <span className="error error_place_register">
            {error.password || ""}
          </span>
          <span className="error error__message">{errorUserDataMessage}</span>
          <button
            className={`register-form__button register-form__button_place_register ${
              isCorrect ? "" : "register-form__button_disabled"
            }`}
            type="submit"
            name="register__button"
            id="register__button"
          >
            {onLoading ? "Сохранение..." : "Зарегистрироваться"}
          </button>
        </form>
        <div className="redirect">
          <p className="redirect__text">
            Уже зарегистрированы?
            <Link to="/signin" className="redirect__link">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
