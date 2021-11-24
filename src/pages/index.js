import { config } from "../components/Config";
import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import Popup from "../components/Popup";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";

import "./index.css";

const deleteIcon = new URL("../images/Delete-Icon.svg", import.meta.url);
const elementLikeActive = new URL(
  "../images/Element-Like_active.svg",
  import.meta.url
);
const elementLike = new URL("../images/Element-Like.svg", import.meta.url);
const logo = new URL("../images/Logo.svg", import.meta.url);
const modalCloseIcon = new URL(
  "../images/Modal-Close-Icon.svg",
  import.meta.url
);
const profileAddButton = new URL(
  "../images/Profile-Add_button.svg",
  import.meta.url
);
const profileEditButton = new URL(
  "../images/Profile-Edit_button.svg",
  import.meta.url
);
const placeholderImage = new URL(
  "../images/placeholder-image.jpg",
  import.meta.url
);
const profileAvatar = new URL("../images/Profile-Avatar.jpg", import.meta.url);

const Images = [
  { name: "Delete Icon", image: deleteIcon },
  { name: "Like Active", link: elementLikeActive },
  { name: "Like", link: elementLike },
  { name: "Logo", image: logo },
  { name: "Close Modal", link: modalCloseIcon },
  { name: "Add Button", link: profileAddButton },
  { name: "Edit Button", image: profileEditButton },
  { name: "Placeholder Image", link: placeholderImage },
  { name: "Profile Avatar", link: profileAvatar },
];

const popupCardAdd = document.querySelector(`.${config.popupCardAdd}`);
const popupProfile = document.querySelector(`.${config.popupProfile}`);
const popupImage = document.querySelector(`.${config.popupImage}`);
const popupAvatar = document.querySelector(`.${config.popupAvatar}`);
const validationConfig = {
  inputErrorClass: "popup__input_type_error",
};

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

const addCard = () => {
  const newCard = {};
  newCard.name = config.placeInputTitle.value;
  newCard.link = config.placeInputLink.value;
  api
    .postNewCard(newCard.name, newCard.link)
    .then((data) => {
      const section = new Section(
        {
          items: data,
          renderer: (item) => {
            const card = new Card(item, config.cardTemplate, api, () => {
              const image = new PopupWithImage(
                popupImage,
                item.link,
                item.name,
                config.image,
                config.popupPictureCaption
              );
              image.open();
            });
            return card.createCard();
          },
        },
        config.cardsContainer
      );
      section.addItem(data);
    })
    .finally(() => (config.createPlaceSubmit.textContent = "Создать"))
    .catch((err) => {
      console.log(err);
    });
};

config.editProfile.addEventListener("click", () => {
  const validator = new FormValidator(validationConfig, config.saveProfile);
  validator.enableValidation();
  validator.clearValidationErrors(config.profileInputList);
  config.profileInputName.value = config.profileTitle.textContent;
  config.profileInputJob.value = config.profileSubTitle.textContent;
  const editProfile = new PopupWithForm(popupProfile, (event) => {
    event.preventDefault();
    config.editProfileSubmit.textContent = "Сохранение...";
    userInfo.setUserInfo(
      config.profileTitle,
      config.profileSubTitle,
      config.editProfileSubmit,
      editProfile
    );
  });
  editProfile.open();
  validator.toggleButtonState(
    config.profileInputList,
    config.editProfileSubmit
  );
});

config.addPlace.addEventListener("click", () => {
  const validator = new FormValidator(validationConfig, config.createPlace);
  validator.enableValidation();
  validator.clearValidationErrors(config.createPlaceInputList);
  const addPlace = new PopupWithForm(popupCardAdd, (event) => {
    event.preventDefault();
    config.createPlaceSubmit.textContent = "Создание...";
    addCard();
    addPlace.close();
  });
  addPlace.open();
  validator.toggleButtonState(
    config.createPlaceInputList,
    config.createPlaceSubmit
  );
});

config.profileAvatar.addEventListener("click", () => {
  const validator = new FormValidator(validationConfig, config.avatarForm);
  validator.enableValidation();
  validator.clearValidationErrors(config.avatarInputList);
  const profileAvatar = new PopupWithForm(popupAvatar, (event) => {
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
  profileAvatar.open();
  validator.toggleButtonState(config.avatarInputList, config.avatarSubmit);
});

config.deleteConfirmButton.addEventListener("click", () => {
  api
    .deleteHandler(config.cardForRemove.id)
    .then(() => {
      config.cardForRemove.remove();
      const acceptConfirm = new Popup(config.popupDeleteConfirm);
      acceptConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    config.profileTitle.textContent = userData.name;
    config.profileSubTitle.textContent = userData.about;
    config.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    config.userId = userData._id;
    const section = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(item, config.cardTemplate, api, () => {
            const image = new PopupWithImage(
              popupImage,
              item.link,
              item.name,
              config.image,
              config.popupPictureCaption
            );
            image.open();
          });
          return card.createCard();
        },
      },
      config.cardsContainer
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
