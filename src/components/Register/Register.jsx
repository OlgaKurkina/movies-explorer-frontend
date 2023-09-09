import React from "react";
import Logo from "../../images/header-logo.png";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
  return (
    <>
      <div className="register">
        <Link to="/">
          <img className="logo logo_place_register" src={Logo} alt="Логотип" />
        </Link>
        <h2 className="wellcome">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <label className="label" for="name">
          Имя
        </label>
        <input
          className="input"
          type="input"
          name="register-name"
          id="register-name"
          required
        />
        <label className="label" for="register-email">
          Email
        </label>
        <input
          className="input"
          type="email"
          name="register-email"
          id="register-email"
          required
        />
        <label className="label" for="register-password">
          Пароль
        </label>
        <input
          className="input"
          type="password"
          name="register-password"
          id="register-password"
          required
        />
        <button
          className="form__button"
          type="submit"
          name="register__button"
          id="register__button"
        >
          {" "}
          Зарегистрироваться
        </button>
      </form>
      <div className="redirect">
        <p className="redirect__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="redirect__link">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
