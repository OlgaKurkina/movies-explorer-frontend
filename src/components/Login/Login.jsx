import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/header-logo.svg";
import "./login.css";

function Login() {
  return (
    <>
      <main className="content">
        <section className="login">
          <Link to="/" className="link link_place_login">
            <img className="logo logo_place_login" src={Logo} alt="Логотип" />
          </Link>
          <h1 className="wellcome">Рады видеть!</h1>
        </section>
        <form className="login-form">
          <label className="label label_place_login">
            E-mail
            <input
              className="input"
              type="email"
              name="email"
              id="login-email"
              required
              minLength={2}
              maxLength={20}
              placeholder="Email"
            />
          </label>

          <label className="label label_place_login">
            Пароль
            <input
              className="input"
              type="password"
              name="password"
              id="login-password"
              required
              minLength={4}
              maxLength={20}
              placeholder="Пароль"
            />
          </label>

          <button
            className="login-form__button login-form__button_place_login"
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
      </main>
    </>
  );
}

export default Login;
