const config = {
  popupImage: "popup_type_picture",
  popupCardAdd: "popup_type_card_add",
  popupProfile: "popup_type_profile",
  popupAvatar: "popup_type_avatar_change",
  popupDeleteConfirm: document.querySelector(".popup_type_delete_confirm"),
  popupCloseBtn: "popup__button-close",
  cardsContainer: document.querySelector(".elements__list"),
  cardTemplate: document.querySelector("#card-template").content,
  cardElement: ".element",
  elementImage: ".element__image",
  image: document.querySelector(".popup__image"),
  popupPictureCaption: document.querySelector(".popup__picture-caption"),
  cardTitle: ".element__title",
  cardDelete: ".element__delete",
  cardLike: ".element__like",
  cardLikeActive: "element__like_active",
  popupOpened: "popup_opened",
  avatarSubmit: document.forms.avatar.querySelector(".popup__button-save"),
  avatarInputList: Array.from(document.forms.avatar.querySelectorAll(".popup__input")),
  avatarInput: document.forms.avatar.querySelector(".popup__input"),
  avatarForm: document.forms.avatar,
  createPlace: document.forms.place,
  createPlaceInputList: Array.from(document.forms.place.querySelectorAll(".popup__input")),
  createPlaceSubmit: document.forms.place.querySelector(".popup__button-save"),
  placeInputTitle: document.forms.place.elements.title,
  placeInputLink: document.forms.place.elements.link,
  editProfile: document.querySelector(".profile__edit-button"),
  editProfileSubmit: document.forms.profile.querySelector(".popup__button-save"),
  profileInputList: Array.from(document.forms.profile.querySelectorAll(".popup__input")),
  profileInputName: document.forms.profile.elements.name,
  profileInputJob: document.forms.profile.elements.job,
  saveProfile: document.forms.profile,
  profileTitle: document.querySelector(".profile__title"),
  profileSubTitle: document.querySelector(".profile__subtitle"),
  profileAvatar: document.querySelector(".profile__avatar"),
  addPlace: document.querySelector(".profile__add-button"),
  deleteConfirmButton: document.querySelector(".popup__button-save_type_confirm"),
  likesCounter: ".element__likes-counter",
  userId: "",
  cardForRemove: {},

  //initialCards:
  // [
  //   {
  //     name: "Архыз",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  //   },
  //   {
  //     name: "Челябинская область",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  //   },
  //   {
  //     name: "Иваново",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  //   },
  //   {
  //     name: "Камчатка",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  //   },
  //   {
  //     name: "Холмогорский район",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  //   },
  //   {
  //     name: "Байкал",
  //     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  //   },
  // ]
};

const configForValidation = {
  formList: document.querySelectorAll(".popup__form"),
  inputErrorClass: "popup__input_type_error",
};

export { config, configForValidation };
