import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  return (
    <>
      <div className="profile">
        <h2 className="profile__wellcome">Привет, Виталий!</h2>
        <form className="profile__form">
          <label className="label label_place_profile" for="profile-name">
            Имя
            <input
              className="profile__input"
              type="profile-name"
              name="profile-name"
              id="profile-name"
            />{" "}
          </label>
          <label className="label label_place_profile" for="profile-email">
            E-mail
            <input
              className="profile__input"
              type="profile-email"
              name="profile-email"
              id="profile-email"
            />{" "}
          </label>
          <button className="profile__button" type="submit">
            Редактировать
          </button>
        </form>
      </div>
      <div className="profile__signout">
        <Link to="/signin" className="profile__link">
          Выйти из аккаунта
        </Link>
      </div>
    </>
  );
}

export default Profile;
