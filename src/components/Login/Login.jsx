import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/header-logo.png";
import "./login.css";

function Login() {
  return (
    <>
      <div className="login">
        <Link to="/">
          <img className="logo logo_place_login" src={Logo} alt="Логотип" />
        </Link>
        <h2 className="wellcome">Рады видеть!</h2>
      </div>
      <form className="login__form">
        <label className="label" for="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          name="email"
          id="login-email"
          required
        />

        <label className="label" for="password">
          Пароль{" "}
        </label>
        <input
          className="input"
          type="password"
          name="password"
          id="login-password"
          required
        />

        <button
          className="form__button form__button_place_login"
          type="submit"
          name="login__button"
          id="login__button"
        >
          Войти
        </button>
      </form>
      <div className="redirect">
        <p className="redirect__text">
          Еще не зарегистрированы?{" "}
          <Link to="/signup" className="redirect__link">
            Регистрация
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
