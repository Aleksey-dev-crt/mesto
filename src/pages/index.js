import { config } from "../utils/config";
import * as constants from "../utils/constants";
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
  { userName: config.profileTitle, userInfo: config.profileSubTitle },
  config
);

const section = new Section((item) => {
  const card = new Card(
    item,
    config.cardTemplate,
    config,
    api,
    () => {
      const image = new PopupWithImage(
        constants.popupImage,
        config.image,
        config.popupPictureCaption
      );
      image.open(item.link, item.name);
    },
    deleteConfirm
  );
  return card.createCard();
}, config.cardsContainer);

const editProfile = new PopupWithForm(constants.popupProfile, (formValues) => {
  config.editProfileSubmit.textContent = "Сохранение...";
  api
    .patchUserData(formValues.name, formValues.job)
    .then(() => {
      config.profileTitle.textContent = formValues.name;
      config.profileSubTitle.textContent = formValues.job;
      editProfile.close();
    })
    .finally(() => (config.editProfileSubmit.textContent = "Сохранить"))
    .catch((err) => {
      console.log(err);
    });
});

const addPlace = new PopupWithForm(constants.popupCardAdd, (formValues) => {
  config.createPlaceSubmit.textContent = "Создание...";
  addCard(formValues);
});

const profileAvatar = new PopupWithForm(constants.popupAvatar, (formValues) => {
  config.avatarSubmit.textContent = "Сохранение...";
  api
    .patchAvatar(formValues.link_avatar)
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

const deleteConfirm = new PopupWithForm(config.popupDeleteConfirm, () => {
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

const editProfileValidator = new FormValidator(
  constants.validationConfig,
  config.saveProfile
);
editProfileValidator.enableValidation();

const addPlaceValidator = new FormValidator(
  constants.validationConfig,
  config.createPlace
);
addPlaceValidator.enableValidation();

const profileAvatarValidator = new FormValidator(
  constants.validationConfig,
  config.avatarForm
);
profileAvatarValidator.enableValidation();

const addCard = (formValues) => {
  api
    .postNewCard(formValues.title, formValues.link)
    .then((data) => {
      section.addItem(data);
      addPlace.close();
    })
    .finally(() => (config.createPlaceSubmit.textContent = "Создать"))
    .catch((err) => {
      console.log(err);
    });
};

config.editProfile.addEventListener("click", () => {
  editProfileValidator.clearValidationErrors();
  userInfo.getUserInfo();
  editProfile.open();
  editProfileValidator.toggleButtonState();
});

config.addPlace.addEventListener("click", () => {
  addPlaceValidator.clearValidationErrors();
  addPlace.open();
  addPlaceValidator.toggleButtonState();
});

config.profileAvatar.addEventListener("click", () => {
  profileAvatarValidator.clearValidationErrors();
  profileAvatar.open();
  profileAvatarValidator.toggleButtonState();
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
