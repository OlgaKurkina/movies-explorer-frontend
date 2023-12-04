class Api {
  constructor({ basePath, headers }) {
    this._basePath = basePath;
    this._headers = headers;
  }

  _getRequest(url, options) {
    return fetch(url, options).then(this._getJson);
  }

  //получение ответа от сервера
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _setHeaders() {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    return headers;
  }

  getMovies() {
    return this._getRequest(`${this._basePath}/movies`, {
      method: "GET",
      headers: this._setHeaders(),
    });
  }

  getProfile() {
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "GET",
      headers: this._setHeaders(),
    });
  }

  updateProfile(data) {
    console.log(data);
    return this._getRequest(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._setHeaders(),
      body: JSON.stringify({
        // name,
        // email,
        name: data.name,
        email: data.email,
      }),
    });
  }

  addMovie(movie) {
    // console.log(movie);
    return this._getRequest(`${this._basePath}/movies`, {
      method: "POST",
      headers: this._setHeaders(),
      body: JSON.stringify(movie),
    });
  }

  //удаление фильма из сохраненных
  deleteMovie(movieId) {
    return this._getRequest(`${this._basePath}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._setHeaders(),
    });
  }
}

export const api = new Api({
  basePath: "https://api.doktorovao.nomoreparties.sbs",
  // basePath: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
});
