import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";

import "./app.css";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onBackPage = () => {
    navigate(-1);
  };

  const location = useLocation();
  const headerRoutes = ["/", "/profile", "/movies", "/saved-movies"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  function handlePopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  if (isLoading) return <Preloader />;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        {headerRoutes.includes(location.pathname) && (
          <Header
            isLoggedIn={isLoggedIn}
            isOpen={isPopupOpen}
            handlePopup={handlePopup}
          />
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                isLoggedIn={isLoggedIn}
                preloader={preloader}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                preloader={preloader}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                isLoggedIn={isLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} onLoading={isLoading} />}
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} onLoading={isLoading} />
            }
          />
          <Route path="*" element={<NotFound onGoBack={onBackPage} />} />
        </Routes>
        {footerRoutes.includes(location.pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
