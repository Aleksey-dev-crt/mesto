const popupEditProfile = document.querySelector(".popup_type_profile");
const editProfile = document.querySelector(".profile__edit-button");
const profileInputName = document.querySelector("#profile-input_name");
const profileInputJob = document.querySelector("#profile-input_job");
const saveProfile = document.querySelector(".popup__form_type_profile");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const popupAddPlace = document.querySelector(".popup_type_card_add");
const addPlace = document.querySelector(".profile__add-button");
const placeInputTitle = document.querySelector("#place-input_title");
const placeInputLink = document.querySelector("#place-input_link");
const createPlace = document.querySelector(".popup__form_type_place");
const popupImage = document.querySelector(".popup_type_picture");
const cardsContainer = document.querySelector(".elements__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementImage.addEventListener("click", () => {
    const image = document.querySelector(".popup__image");
    image.src = cardData.link;
    image.alt = cardData.name;
    document.querySelector(".popup__picture-caption").textContent =
      cardData.name;
    openPopup(popupImage);
  });
  cardElement.querySelector(".element__title").textContent = cardData.name;
  cardElement
    .querySelector(".element__delete")
    .addEventListener("click", event => event.target.parentElement.remove());
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", event => event.target.classList.toggle("element__like_active"));
  return cardElement;
}

function initial(data, container) {
  data.forEach(card => container.append(createCard(card)));
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

initial(initialCards, cardsContainer);

editProfile.addEventListener("click", () => {
  profileInputName.value = profileTitle.textContent;
  profileInputJob.value = profileSubTitle.textContent;
  openPopup(popupEditProfile);
});

addPlace.addEventListener("click", () => openPopup(popupAddPlace));

document.addEventListener("click", event => {
  const isButtonCloseClicked = event.target.classList.contains("popup__button-close");
  const isOverlayProfileClicked = event.target.classList.contains("popup_type_profile");
  const isOverlayPlaceClicked = event.target.classList.contains("popup_type_card_add");
  const isOverlayPictureClicked = event.target.classList.contains("popup_type_picture");
  if (isButtonCloseClicked || isOverlayProfileClicked) closePopup(popupEditProfile);
  if (isButtonCloseClicked || isOverlayPlaceClicked) closePopup(popupAddPlace);
  if (isButtonCloseClicked || isOverlayPictureClicked) closePopup(popupImage);
});

saveProfile.addEventListener("submit", event => {
  event.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileSubTitle.textContent = profileInputJob.value;
  closePopup(popupEditProfile);
});

createPlace.addEventListener("submit", event => {
  event.preventDefault();
  const newCard = {};
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  cardsContainer.prepend(createCard(newCard));
  createPlace.reset();
  closePopup(popupAddPlace);
});
