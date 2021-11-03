const configAPI = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "404cf7e6-f742-45c3-8054-e5f1c388edbf",
    "Content-Type": "application/json",
  },
};

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status + " - " + res.statusText}`);
}

const getInitialCards = () => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    headers: configAPI.headers,
  }).then(checkResponse)
};

const getUserData = () => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    headers: configAPI.headers,
  }).then(checkResponse)
};

const patchUserData = (name, about) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse)
};

const patchAvatar = (link) => {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: link
    }),
  }).then(checkResponse)
};

const postNewCard = (name, link) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse)
};

const likeHandler = (cardId, method) => {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: configAPI.headers,
  }).then(checkResponse)
};

const deleteHandler = (cardId) => {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then(checkResponse)
};

export {
  getInitialCards,
  getUserData,
  patchUserData,
  postNewCard,
  likeHandler,
  deleteHandler,
  patchAvatar
};
