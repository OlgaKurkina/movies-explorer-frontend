import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import useForm from "../hooks/useForm";
import "./profile.css";

function Profile({ onUpdateUser, onSignOut, errorProfileMessage }) {
  return (
    <>
      <main className="content">
        <section className="profile">
          <h1 className="profile__wellcome">Привет, {currentUser.name}!</h1>
          <form className="profile__form">
            <label className="label label_place_profile">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                id="profile-name"
                minLength={2}
                maxLength={20}
                required
                placeholder="Имя"
                value={isChanging ? formValue.name : currentUser.name || ""}
              />
            </label>
            <span className="error error_place_profile">
              {error.name || ""}
            </span>
            <label className="label label_place_profile">
              Email
              <input
                className="profile__input"
                type="email"
                name="email"
                id="profile-email"
                minLength={2}
                maxLength={20}
                required
                placeholder="Email"
                value={isChanging ? formValue.email : currentUser.email || ""}
              />
            </label>
            <span className="error error_place_profile">
              {error.email || ""}
            </span>
            <span className="profile-error">{errorProfileMessage}</span>
            <button
              type="submit"
              className="profile__submit-btn"
              name="submit"
              defaultValue="Сохранить"
            >
              Сохранить
            </button>
            <button className="profile__button" type="button">
              Редактировать
            </button>
          </form>
        </section>
        <div className="profile-signout">
          <Link to="/signin" className="profile-link" onClick={onSignOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </main>
    </>
  );
}

export default Profile;
