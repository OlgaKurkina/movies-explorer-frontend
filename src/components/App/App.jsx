import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
//import ProtectedRouteElement from "../ProtectedRoute";
import { CurrentUserContext } from "../context/CurrentUserContext";
import "./app.css";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

import NotFound from "../NotFound/NotFound";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const onBackPage = () => {
    navigate(-1);
  };

  const route = useLocation().pathname;
  const headerRoutes = ["/", "/profile", "/movies", "/saved-movies"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        {headerRoutes.includes(route) && (
          <Header
            isLoggedIn={isLoggedIn}
            isOpen={isPopupOpen}
            handlePopup={handlePopup}
          />
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound onGoBack={onBackPage} />} />
        </Routes>
        {footerRoutes.includes(route) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
