import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import ProtectedRouteElement from "../ProtectedRoute";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as auth from "../../utils/MainAuth.js";
import { api } from "../../utils/MainApi";
import { getMovieList } from "../../utils/MoviesApi";
import { ERRORS, ERRORS_MOVIES, durationShort } from "../../utils/constants.js";
import "./app.css";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isUserFirstSearch, setIsUserFirstSearch] = useState(true);
  const [searchForm, setSearchForm] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [shortDurationCheckbox, setShortDurationCheckbox] = useState(false);
  const [searchSavedForm, setSearchSavedForm] = useState("");
  const [savedShortDurationCheckbox, setSavedShortDurationCheckbox] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorProfileMessage, setErrorProfileMessage] = useState("");
  const [errorUserDataMessage, setErrorUserDataMessage] = useState("");

  const [showAllMovies, setShowAllMovies] = useState(savedMovies);
  const [foundMovies, setFoundMovies] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const headerRoutes = ["/", "/profile", "/movies", "/saved-movies"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  function handlePopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  //регистрация
  function handleRegister({ name, email, password }) {
    setErrorUserDataMessage("");
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 500") {
          setErrorUserDataMessage(ERRORS.SERVER_500);
          console.log(err);
        } else if (err === "Ошибка: 409") {
          setErrorUserDataMessage(ERRORS.REGISTER_409);
          console.log(err);
        } else {
          setErrorUserDataMessage(ERRORS.REGISTER_400);
          console.log(err);
        }
      });
  }

  //авторизация
  function handleLogin(email, password) {
    setErrorUserDataMessage("");
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          navigate("/movies", { replace: true });

          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 500") {
          setErrorUserDataMessage(ERRORS.SERVER_500);
          console.log(err);
        } else if (err === "Ошибка: 401") {
          setErrorUserDataMessage(ERRORS.LOGIN_401);
          console.log(err);
        } else {
          setErrorUserDataMessage(ERRORS.LOGIN_400);
          console.log(err);
        }
      });
  }

  //выход
  function handleSignOut() {
    setIsLoggedIn(false);
    setFilterMovies([]);
    setSearchForm("");
    setShortDurationCheckbox(false);
    setErrorUserDataMessage("");
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("search-input");
    localStorage.removeItem("checkbox");
    localStorage.removeItem("filterMovies");
    navigate("/", { replace: true });
  }

  //проверка токена
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    // console.log(jwt);
    if (jwt) {
      auth.checkToken(jwt);
      api
        .getProfile()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //обновление профиля
  function handleUpdateUser(newData) {
    setErrorProfileMessage("");
    setIsLoading(true);
    api
      .updateProfile(newData)
      .then((data) => {
        setCurrentUser(data);
        setErrorProfileMessage(ERRORS.IS_SUCCESS);
      })
      .catch((err) => {
        if (err === "Ошибка: 500") {
          setErrorProfileMessage(ERRORS.SERVER_500);
          console.log(err);
        } else if (err === "Ошибка: 409") {
          setErrorProfileMessage(ERRORS.PROFILE_409);
          console.log(err);
        } else {
          setErrorProfileMessage(ERRORS.PROFILE_400);
          console.log(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //получение карточек и профиля
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfile(), api.getMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user.data);
          setSavedMovies(savedMovies);
          setMovies(JSON.parse(localStorage.getItem("movies")) ?? movies);
          setFilterMovies(
            JSON.parse(localStorage.getItem("filterMovies")) ?? filterMovies
          );
          setSearchForm(localStorage.getItem("search-input") ?? searchForm);

          setShortDurationCheckbox(localStorage.getItem("checkbox") === "true");
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  //получение фильмов с сервера
  function getFilms() {
    setErrorMessage("");
    getMovieList()
      .then((newMovies) => {
        setMovies(newMovies);
        saveMovies(newMovies);
        localStorage.setItem("movies", JSON.stringify(newMovies));
      })
      .catch((err) => {
        setErrorMessage(ERRORS.ERROR_SEARCH);
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
      });
  }

  //поиск фильмов

  const searchMovies = () => {
    setErrorMessage("");
    setIsUserFirstSearch(false);
    if (!searchForm) {
      setErrorMessage(ERRORS_MOVIES.EMPTY_REQUEST);
      setFilterMovies([]);
      return;
    }
    setPreloader(true);
    if (movies.length > 0) {
      saveMovies(movies);
      setPreloader(false);
    } else {
      getFilms();
      setErrorMessage("");
    }
  }; // [movies, searchForm]);

  //сохранение фильмов
  function saveMovies(movies) {
    const newFilteredMovies = sortMovies(
      movies,
      searchForm,
      shortDurationCheckbox
    );
    localStorage.setItem("filterMovies", JSON.stringify(newFilteredMovies));
    localStorage.setItem("search-input", searchForm);
    localStorage.setItem("checkbox", shortDurationCheckbox);
    setFilterMovies(newFilteredMovies);
  }

  //показ ошибок
  useEffect(() => {
    if (movies.length === 0) return;
    if (!searchForm) {
      setErrorMessage(ERRORS_MOVIES.EMPTY_REQUEST);
    } else if (filterMovies.length === 0) {
      setErrorMessage(ERRORS_MOVIES.NOTHING_FOUND);
    } else {
      setErrorMessage("");
    }
  }, [filterMovies, searchForm, errorMessage, movies.length]);

  //фильтрация фильмов
  function sortMovies(movies, searchForm, checkbox) {
    return movies.filter((movie) =>
      checkbox
        ? movie.duration <= durationShort &&
          (movie.nameRU.toLowerCase().includes(searchForm.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchForm.toLowerCase()))
        : movie.nameRU.toLowerCase().includes(searchForm.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchForm.toLowerCase())
    );
  }

  //поиск сохраненных фильмов
  function searchSavedMovies() {
    const sortedMovies = sortMovies(
      savedMovies,
      searchSavedForm,
      savedShortDurationCheckbox
    );
    setFilterSavedMovies(sortedMovies);
  }

  useEffect(searchSavedMovies, [
    savedShortDurationCheckbox,
    savedMovies,
    searchSavedForm,
  ]);

  //проверка лайка
  function handleLike(savedMovies, movie) {
    return savedMovies.find((item) => item.movieId === movie.id);
  }

  //добавление карточек
  function onLike(movie) {
    api
      .addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setFilterSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление фильмов
  function onDeleteMovie(movie) {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((savedMovies) =>
          savedMovies.filter((element) => element._id !== movie._id)
        );
        setFilterSavedMovies(
          savedMovies.filter((element) => element._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isUserFirstSearch) return;
    searchMovies();
  }, [shortDurationCheckbox, isUserFirstSearch]);

  function handleCheckBox() {
    setShortDurationCheckbox(!shortDurationCheckbox);
  }

  function handleSavedCheckBox() {
    setSavedShortDurationCheckbox(!savedShortDurationCheckbox);
  }

  function resetSearchSavedMovies() {
    setSearchSavedForm("");
    setSavedShortDurationCheckbox(false);
    setErrorMessage("");
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
                movies={filterMovies}
                isLoggedIn={isLoggedIn}
                preloader={preloader}
                searchMovies={searchMovies}
                searchForm={searchForm}
                onLike={onLike}
                onDelete={onDeleteMovie}
                handleLike={handleLike}
                setSearchForm={setSearchForm}
                setFilterMovies={setFilterMovies}
                onCheckbox={handleCheckBox}
                shortDurationCheckbox={shortDurationCheckbox}
                errorMessage={errorMessage}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                movies={filterSavedMovies}
                isLoggedIn={isLoggedIn}
                preloader={preloader}
                searchMovies={searchSavedMovies}
                onLike={onLike}
                onDelete={onDeleteMovie}
                handleLike={handleLike}
                setSearchForm={setSearchSavedForm}
                setFilterMovies={setFilterMovies}
                resetSearchSavedMovies={resetSearchSavedMovies}
                onCheckbox={handleSavedCheckBox}
                savedShortDurationCheckbox={savedShortDurationCheckbox}
                errorMessage={errorMessage}
                savedMovies={savedMovies}
                searchForm={searchSavedForm}
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
                errorProfileMessage={errorProfileMessage}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                onLoading={isLoading}
                errorUserDataMessage={errorUserDataMessage}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                onLoading={isLoading}
                errorUserDataMessage={errorUserDataMessage}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {footerRoutes.includes(location.pathname) && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
