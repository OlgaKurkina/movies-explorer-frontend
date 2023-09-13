import React from "react";
import { Link, useMatch } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Logo from "../../images/header-logo.svg";
import "./header.css";

export default function Header({ isLoggedIn, isOpen, handlePopup }) {
  const match = useMatch("/");

  return match ? (
    <header className="header header_theme_dark">
      <Link to="/" className="link">
        <img className="logo" src={Logo} alt="Логотип" />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        handlePopup={handlePopup}
      />
    </header>
  ) : (
    <header className="header header_theme_light">
      <Link to="/" className="link">
        <img className="logo" src={Logo} alt="Логотип" />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isOpen={isOpen}
        handlePopup={handlePopup}
      />
    </header>
  );
}
