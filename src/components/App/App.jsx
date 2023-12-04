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
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorProfileMessage, setErrorProfileMessage] = useState("");

  const navigate = useNavigate();
  const onBackPage = () => {
    navigate(-1);
  };

  const location = useLocation();

  const headerRoutes = ["/", "/profile", "/movies", "/saved-movies"];
  const footerRoutes = ["/", "/movies", "/saved-movies"];

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  //регистрация
  function handleRegister({ name, email, password }) {
    console.log({ name, email, password });
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        if (err === 500) {
          setErrorMessage(ERRORS.SERVER_500);
          console.log(errorMessage);
        } else if (err === 409) {
          setErrorMessage(ERRORS.REGISTER_409);
          console.log(errorMessage);
        } else {
          setErrorMessage(ERRORS.REGISTER_400);
          console.log(errorMessage);
        }
      });
  }

  //авторизация
  function handleLogin(email, password) {
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
        if (err === 500) {
          setErrorMessage(ERRORS.SERVER_500);
          console.log(errorMessage);
        }
        if (err === 401) {
          setErrorMessage(ERRORS.LOGIN_401);
          console.log(errorMessage);
        } else {
          setErrorMessage(ERRORS.LOGIN_400);
          console.log(errorMessage);
        }
      });
  }

  //выход
  function handleSignOut() {
    setIsLoggedIn(false);
    setFilterMovies([]);
    setSearchForm("");
    setShortDurationCheckbox(false);
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  }

  //проверка токена
  const handleCheckToken = () => {
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      auth.checkToken(jwt);
      api
        .getProfile()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  //обновление профиля
  function handleUpdateUser(newData) {
    setIsLoading(true);
    api
      .updateProfile(newData)
      .then((data) => {
        setCurrentUser(data);
        setErrorProfileMessage(ERRORS.IS_SUCCESS);
      })
      .catch((err) => {
        if (err === 500) {
          setErrorProfileMessage(ERRORS.SERVER_500);
          console.log(errorProfileMessage);
        } else if (err === 409) {
          setErrorProfileMessage(ERRORS.PROFILE_409);
          console.log(errorProfileMessage);
        } else {
          setErrorProfileMessage(ERRORS.PROFILE_400);
          console.log(errorProfileMessage);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //получение карточек
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfile(), api.getMovies()])
        .then(([user, savedMovies]) => {
          setCurrentUser(user.data);
          setSavedMovies(savedMovies);
          setMovies(movies);
          setFilterMovies(filterMovies);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  //получение фильмов с сервера
  const getFilms = () => {
    getMovieList()
      .then((movies) => {
        const newMovies = movies.map((movie) => ({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: "https://api.nomoreparties.co" + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail:
            "https://api.nomoreparties.co" + movie.image.formats.thumbnail.url,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }));
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
  };

  //поиск фильмов
  const searchMovies = () => {
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
    }
  };

  //сохранение фильмов
  const saveMovies = (movies) => {
    const newFilteredMovies = sortMovies(
      movies,
      searchForm,
      shortDurationCheckbox
    );
    localStorage.setItem("movies", JSON.stringify(newFilteredMovies));
    localStorage.setItem("search-input", searchForm);
    localStorage.setItem("checkbox", shortDurationCheckbox);
    setFilterMovies(newFilteredMovies);
  };

  useEffect(() => {
    if (movies.length === 0) return;
    if (!searchForm) return setErrorMessage(ERRORS_MOVIES.EMPTY_REQUEST);

    if (filterMovies.length === 0) {
      setErrorMessage(ERRORS_MOVIES.NOTHING_FOUND);
    } else {
      setErrorMessage("");
    }
  }, [filterMovies, searchForm]);

  const sortMovies = (movies, searchForm, checkbox) => {
    return movies.filter((movie) =>
      checkbox
        ? movie.duration <= durationShort &&
          (movie.nameRU.toLowerCase().includes(searchForm.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchForm.toLowerCase()))
        : movie.nameRU.toLowerCase().includes(searchForm.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchForm.toLowerCase())
    );
  };

  const searchSavedMovies = () => {
    const sortedMovies = sortMovies(
      savedMovies,
      searchSavedForm,
      savedShortDurationCheckbox
    );
    setFilterSavedMovies(sortedMovies);
  };

  useEffect(searchSavedMovies, [savedShortDurationCheckbox, savedMovies]);

  //добавление и удаление карточек
  const checkingLike = (movie) =>
    savedMovies.some((element) => element.movieId === movie.movieId);

  const onLike = (movie) => {
    api
      .addMovie(movie)
      .then((newMovie) => {
        console.log(newMovie.movieId);
        setSavedMovies([newMovie, ...savedMovies]);
        let moviesToRender = renderedMovies.map((item) =>
          item.id === newMovie.movieId ? movie : item
        );
        localStorage.setItem("savedMovies", JSON.stringify(moviesToRender));
        setRenderedMovies(moviesToRender);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаление фильмов
  const onDelete = (movie) => {
    const filmId = movie._id
      ? movie._id
      : savedMovies.find((element) => element.movieId === movie.movieId)._id;
    api
      .deleteMovie(filmId)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((element) => element._id !== filmId)
        );
        console.log(filmId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetSearchMovies = () => {
    setSearchForm("");
    setShortDurationCheckbox(false);
  };

  const resetSearchSavedMovies = () => {
    setSearchSavedForm("");
    setSavedShortDurationCheckbox(false);
  };

  useEffect(() => {
    if (isUserFirstSearch) return;
    searchMovies();
  }, [shortDurationCheckbox, savedMovies]);

  const handleCheckBox = () => {
    setShortDurationCheckbox(!shortDurationCheckbox);
  };

  const handleSavedCheckBox = () => {
    setSavedShortDurationCheckbox(!savedShortDurationCheckbox);
  };

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
                onDelete={onDelete}
                checkingLike={checkingLike}
                setSearchForm={setSearchForm}
                setFilterMovies={setFilterMovies}
                onCheckbox={handleCheckBox}
                shortDurationCheckbox={shortDurationCheckbox}
                errorMessage={errorMessage}
                resetSearchMovies={resetSearchMovies}
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
                onDelete={onDelete}
                checkingLike={checkingLike}
                setSearchForm={setSearchSavedForm}
                setFilterMovies={setFilterMovies}
                resetSearchSavedMovies={resetSearchSavedMovies}
                onCheckbox={handleSavedCheckBox}
                savedShortDurationCheckbox={savedShortDurationCheckbox}
                errorMessage={errorMessage}
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
