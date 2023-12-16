import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import useForm from "../hooks/useForm";
import "./profile.css";

function Profile({ onUpdateUser, onSignOut, errorProfileMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const { formValue, error, handleChange, setInfo } = useForm();

  function handleEditProfile() {
    setIsChanging(true);
    setInfo(currentUser.name, currentUser.email);
  }

  function handleCheck(evt) {
    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(formValue);
  }

  useEffect(() => {
    if (
      formValue.name === currentUser.name &&
      formValue.email === currentUser.email
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [formValue.name, formValue.email, currentUser.name, currentUser.email]);

  return (
    <>
      <main className="content">
        <section className="profile">
          <h1 className="profile__wellcome">Привет, {currentUser.name}!</h1>
          <form
            className="profile__form"
            onSubmit={isChanging ? handleSubmit : handleEditProfile}
          >
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
                onChange={handleCheck}
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
                onChange={handleCheck}
              />
            </label>
            <span className="error error_place_profile">
              {error.email || ""}
            </span>
            <span className="profile-error">{errorProfileMessage}</span>
            <button
              type="submit"
              className={`profile__submit-btn ${
                isChanging ? "" : "profile__submit-btn_hidden"
              } ${buttonDisabled ? "profile__submit-btn_disabled" : ""}`}
              name="submit"
              defaultValue="Сохранить"
              disabled={isChanging && buttonDisabled ? true : false}
            >
              Сохранить
            </button>
            <button
              className={`profile__button ${
                isChanging ? "profile__button_hidden" : ""
              }`}
              type="button"
              onClick={handleEditProfile}
            >
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
