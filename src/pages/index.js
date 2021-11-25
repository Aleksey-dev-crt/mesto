import { config } from "../utils/config";
import * as constans from "../utils/constans"
import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";

import "./index.css";



const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-3",
  headers: {
    authorization: "404cf7e6-f742-45c3-8054-e5f1c388edbf",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo(
  { userName: config.profileInputName, userInfo: config.profileInputJob },
  api
);

const section = new Section(
    (item) => {
      const card = new Card(item, config.cardTemplate, config, api, () => {
        const image = new PopupWithImage(
          constans.popupImage,
          item.link,
          item.name,
          config.image,
          config.popupPictureCaption
        );
        image.open();
      },
      deleteConfirm
      );
      return card.createCard();
    },
  config.cardsContainer
);

const editProfile = new PopupWithForm(constans.popupProfile, (event) => {
  event.preventDefault();
  config.editProfileSubmit.textContent = "Сохранение...";
  userInfo.setUserInfo(
    config.profileTitle,
    config.profileSubTitle,
    config.editProfileSubmit,
    editProfile
  );
});

const addPlace = new PopupWithForm(constans.popupCardAdd, (event) => {
  event.preventDefault();
  config.createPlaceSubmit.textContent = "Создание...";
  addCard();
  addPlace.close();
});

const profileAvatar = new PopupWithForm(constans.popupAvatar, (event) => {
  event.preventDefault();
  config.avatarSubmit.textContent = "Сохранение...";
  api
    .patchAvatar(config.avatarInput.value)
    .then((data) => {
      config.profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      profileAvatar.close();
    })
    .finally(() => {
      config.avatarSubmit.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
});

const deleteConfirm = new PopupWithForm(config.popupDeleteConfirm, (event) => {
  event.preventDefault();
  api
    .deleteHandler(config.cardForRemove.id)
    .then(() => {
      config.cardForRemove.remove();
      deleteConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

const addCard = () => {
  const newCard = {};
  newCard.name = config.placeInputTitle.value;
  newCard.link = config.placeInputLink.value;
  api
    .postNewCard(newCard.name, newCard.link)
    .then((data) => {
      section.addItem(data);
    })
    .finally(() => (config.createPlaceSubmit.textContent = "Создать"))
    .catch((err) => {
      console.log(err);
    });
};

config.editProfile.addEventListener("click", () => {
  const validator = new FormValidator(constans.validationConfig, config.saveProfile);
  validator.enableValidation();
  validator.clearValidationErrors(config.profileInputList);
  config.profileInputName.value = config.profileTitle.textContent;
  config.profileInputJob.value = config.profileSubTitle.textContent;

  editProfile.open();
  validator.toggleButtonState(
    config.profileInputList,
    config.editProfileSubmit
  );
});

config.addPlace.addEventListener("click", () => {
  const validator = new FormValidator(constans.validationConfig, config.createPlace);
  validator.enableValidation();
  validator.clearValidationErrors(config.createPlaceInputList);

  addPlace.open();
  validator.toggleButtonState(
    config.createPlaceInputList,
    config.createPlaceSubmit
  );
});

config.profileAvatar.addEventListener("click", () => {
  const validator = new FormValidator(constans.validationConfig, config.avatarForm);
  validator.enableValidation();
  validator.clearValidationErrors(config.avatarInputList);

  profileAvatar.open();
  validator.toggleButtonState(config.avatarInputList, config.avatarSubmit);
});

Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    config.profileTitle.textContent = userData.name;
    config.profileSubTitle.textContent = userData.about;
    config.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    config.userId = userData._id;
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
