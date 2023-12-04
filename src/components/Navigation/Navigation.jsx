import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navigation.css";
import Account from "../../images/account.svg";
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
          <nav className="navigation-movies">
            <NavLink to="/movies" className="navigation-movies__link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation-movies__link">
              Сохраненные фильмы
            </NavLink>
          </nav>
          <div className="profile-btn profile-btn_place_header">
            <Link to="/profile" className="profile-btn__link">
              Аккаунт
            </Link>
            <img
              className="profile-icon profile-btn__icon"
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
        <nav className="popup__menu">
          <NavLink to="/" className="popup__menu-link">
            Главная
          </NavLink>
          <NavLink to="/movies" className="popup__menu-link">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="popup__menu-link">
            Сохраненные фильмы
          </NavLink>
          <div className="profile-btn profile-btn_place_popup">
            <Link to="/profile" className="profile-btn__link">
              Аккаунт
            </Link>
            <img
              className="profile-btn__icon"
              src={Account}
              alt="Профиль пользователя"
            />
          </div>
        </nav>
      </div>
    </>
  );
}
