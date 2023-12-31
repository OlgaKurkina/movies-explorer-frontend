import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/header-logo.svg";
import useForm from "../../hooks/useForm";
import "./login.css";

const Login = ({
  onLogin,
  onLoading,
  errorUserDataMessage,
  isLoggedIn,
  sending,
}) => {
  const { formValue, error, handleChange, isCorrect, resetValidation } =
    useForm();

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(formValue.email, formValue.password);
  };

  const handleValidation = () => {
    resetValidation();
  };

  useEffect(() => {
    isLoggedIn && navigate("/", { replace: true });
  });

  return (
    <>
      <main className="content">
        <section className="login">
          <Link to="/" className="link link_place_login">
            <img className="logo logo_place_login" src={Logo} alt="Логотип" />
          </Link>
          <h1 className="wellcome">Рады видеть!</h1>
        </section>
        <form className="login-form" onSubmit={handleSubmit}>
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
              value={formValue.email}
              onChange={handleChange}
              pattern="^\w+@\w+.(com|net|ru)$"
            />
          </label>
          <span className="error error_place_login">{error.email || ""}</span>
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
              value={formValue.password}
              onChange={handleChange}
            />
          </label>
          <span className="error error_place_login">
            {error.password || ""}
          </span>
          <span className="error error__message">{errorUserDataMessage}</span>
          <button
            className={`login-form__button login-form__button_place_login ${
              isCorrect || sending ? "" : "register-form__button_disabled"
            }`}
            type="submit"
            name="login__button"
            id="login__button"
            disabled={sending || !isCorrect ? true : false}
          >
            {onLoading ? "Сохранение..." : "Войти"}
          </button>
        </form>
        <div className="redirect">
          <p className="redirect__text">
            Еще не зарегистрированы?{" "}
            <Link
              to="/signup"
              className="redirect__link"
              onClick={handleValidation}
            >
              Регистрация
            </Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
