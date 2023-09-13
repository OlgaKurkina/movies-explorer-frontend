import React from "react";
import Logo from "../../images/header-logo.svg";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
  return (
    <>
      <main className="content">
        <section className="register">
          <Link to="/" className="logo__link">
            <img
              className="logo logo_place_register"
              src={Logo}
              alt="Логотип"
            />
          </Link>
          <h1 className="wellcome">Добро пожаловать!</h1>
        </section>
        <form className="register__form">
          <label className="label label_place_register">
            Имя
            <input
              className="input"
              type="text"
              name="register-name"
              id="register-name"
              required
              minLength={2}
              maxLength={20}
              placeholder="Имя"
            />
          </label>
          <label className="label label_place_register">
            Email
            <input
              className="input"
              type="email"
              name="register-email"
              id="register-email"
              required
              minLength={2}
              maxLength={20}
              placeholder="Email"
            />
          </label>
          <label className="label label_place_register">
            Пароль
            <input
              className="input"
              type="password"
              name="register-password"
              id="register-password"
              required
              minLength={4}
              maxLength={20}
              placeholder="Пароль"
            />
          </label>
          <button
            className="form__button form__button_place_register"
            type="submit"
            name="register__button"
            id="register__button"
          >
            Зарегистрироваться
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
}

export default Register;
