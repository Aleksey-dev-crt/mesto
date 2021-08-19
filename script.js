const popupEditProfile = document.querySelector("#edit-profile");
const editProfile = document.querySelector(".profile__edit-button");
const closeProfile = document.querySelector("#close-profile");
const profileInput = document.querySelectorAll("#profile-input");
const saveProfile = document.querySelector("#save-profile");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const popupAddPlace = document.querySelector("#add-place");
const addPlace = document.querySelector(".profile__add-button");
const closePlace = document.querySelector("#close-place");
const placeInput = document.querySelectorAll("#place-input");
const createPlace = document.querySelector("#create-place");
const popupImage = document.querySelector("#place-image");
const closeImage = document.querySelector("#close-image");
const cardsContainer = document.querySelector(".elements__list");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function renderCard(card) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");

  elementImage.setAttribute("src", card.link);
  elementImage.setAttribute("alt", card.name);
  elementImage.addEventListener("click", () => {
    document.querySelector(".popup__image").setAttribute("src", card.link);
    document.querySelector(".popup__image").setAttribute("alt", card.name);
    document.querySelector(".popup__image-caption").textContent = card.name;
    openPopup(popupImage);
  });
  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", (evt) => {
      evt.target.parentElement.remove();
    });
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });
  cardsContainer.append(cardElement);
}

function initial() {
  initialCards.forEach((card) => {
    renderCard(card);
  });
}

function addCard() {
  const lastCard = initialCards[initialCards.length - 1];
  renderCard(lastCard);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

initial(initialCards);

editProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

closeProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

addPlace.addEventListener("click", () => {
  openPopup(popupAddPlace);
});

closePlace.addEventListener("click", () => {
  closePopup(popupAddPlace);
});

closeImage.addEventListener("click", () => {
  closePopup(popupImage);
});

saveProfile.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileInput.forEach((element) => {
    let inputName = element.getAttribute("name");
    if (inputName === "name") {
      profileTitle.textContent = element.value;
    }
    if (inputName === "description") {
      profileSubTitle.textContent = element.value;
    }
  });
  closePopup(popupEditProfile);
});

createPlace.addEventListener("click", (evt) => {
  evt.preventDefault();
  const newCard = {};
  placeInput.forEach((element) => {
    let inputName = element.getAttribute("name");
    if (inputName === "title") {
      newCard.name = element.value;
    }
    if (inputName === "link") {
      newCard.link = element.value;
    }
  });
  initialCards.push(newCard);
  addCard();
  closePopup(popupAddPlace);
});
