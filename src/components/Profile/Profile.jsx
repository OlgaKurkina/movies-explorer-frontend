import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  return (
    <>
      <main className="content">
        <section className="profile">
          <h1 className="profile__wellcome">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className="label label_place_profile">
              Имя
              <input
                className="profile__input"
                type="text"
                name="profile-name"
                id="profile-name"
                minLength={2}
                maxLength={20}
                required
                placeholder="Имя"
              />
            </label>
            <label className="label label_place_profile">
              E-mail
              <input
                className="profile__input"
                type="text"
                name="profile-email"
                id="profile-email"
                minLength={2}
                maxLength={20}
                required
                placeholder="Email"
              />
            </label>
            <button className="profile__button" type="submit">
              Редактировать
            </button>
          </form>
        </section>
        <div className="profile__signout">
          <Link to="/" className="profile__link">
            Выйти из аккаунта
          </Link>
        </div>
      </main>
    </>
  );
}

export default Profile;
