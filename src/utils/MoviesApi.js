export const BASE_URL = "https://api.nomoreparties.co";

const getJson = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getMovieList = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getJson);
};
