import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navigation.css";
import Account from "../../images/account.png";
import usePopupClose from "../../hooks/usePopupClose";

export default function Navigation({ isLoggedIn, isOpen, handlePopup }) {
  usePopupClose(isOpen, handlePopup);
  return (
    <>
      {isLoggedIn ? (
        <nav className="navigation">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link-login"
          >
            Войти
          </Link>
        </nav>
      ) : (
        <>
          <nav className="navigation__movies">
            <NavLink to="/movies" className="navigation__movies-link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__movies-link">
              Сохраненные фильмы
            </NavLink>
          </nav>
          <div className="navigation__profile">
            <Link to="/profile" className="navigation__profile-link">
              Аккаунт
            </Link>
            <img
              className="profile__icon"
              src={Account}
              alt="Профиль пользователя"
            />
          </div>
          <button
            className="burger-menu"
            type="button"
            onClick={handlePopup}
          ></button>
        </>
      )}
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <button
          className="popup__close-btn"
          type="button"
          onClick={handlePopup}
        ></button>
        <nav className="menu__movies">
          <NavLink to="/" className="menu__link">
            Главная
          </NavLink>
          <NavLink to="/movies" className="menu__link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="menu__link">
            Сохраненные фильмы
          </NavLink>
          <div className="profile__menu">
            <Link to="/profile" className="navigation__profile-link">
              Аккаунт
            </Link>
            <img
              className="profile__icon"
              src={Account}
              alt="Профиль пользователя"
            />
          </div>
        </nav>
      </div>
    </>
  );
}
