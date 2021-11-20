// const configAPI = {
//   baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
//   headers: {
//     authorization: "404cf7e6-f742-45c3-8054-e5f1c388edbf",
//     "Content-Type": "application/json",
//   },
// };

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl,
    this.headers = options.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status + " - " + res.statusText}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  patchUserData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  patchAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  likeHandler(cardId, method) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteHandler(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }
}


export const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "404cf7e6-f742-45c3-8054-e5f1c388edbf",
    "Content-Type": "application/json",
  }
});

// export {
//   getInitialCards,
//   getUserData,
//   patchUserData,
//   postNewCard,
//   likeHandler,
//   deleteHandler,
//   patchAvatar,
// };
