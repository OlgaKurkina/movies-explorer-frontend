export const ERRORS = {
  SERVER_500: "На сервере произошла ошибка",
  REGISTER_400: "При регистрации пользователя произошла ошибка",
  REGISTER_409: "Пользователь с таким email уже существует",
  LOGIN_400: "При входе произошла ошибка.",
  LOGIN_401: "Вы ввели неправильный логин или пароль",

  PROFILE_409: "Пользователь с таким email уже существует",
  PROFILE_400: "При обновлении профиля произошла ошибка",
  IS_SUCCESS: "Данные изменены",

  ERROR_SEARCH:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
};

export const ERRORS_MOVIES = {
  NOTHING_FOUND: "Ничего не найдено",
  EMPTY_REQUEST: "Введите слова для поиска",
};

export const durationShort = 40;

export const REG_EX_EMAIL =
  /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)*(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
