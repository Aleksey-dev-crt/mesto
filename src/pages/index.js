import { config } from "../components/config";
//import { createCard } from "../components/card";
//import { closePopup, openPopup } from "../components/modal";
// import {
//   enableValidation,
//   clearValidationErrors,
//   toggleButtonState,
// } from "../components/validate";

import { api } from "../components/api";
import Card from "../components/card";
import FormValidator from "../components/validate";
import Section from "../components/section";
import { Popup, PopupWithForm } from "../components/modal";

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
const popupAvatar = document.querySelector(`.${config.popupAvatar}`);
// const popupCloseButtonList = Array.from(
//   document.querySelectorAll(`.${config.popupCloseBtn}`)
// );
const validationConfig = {
  inputErrorClass: "popup__input_type_error",
};

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
            const card = new Card(item, config.cardTemplate);
            return card.createCard(data);
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

// const initial = (data, container) => {
//   data.forEach((card) => {
//     card = new Card(card, config.cardTemplate);
//     container.append(card.createCard(card.cardData));
//   });
// };

config.editProfile.addEventListener("click", () => {
  const validator = new FormValidator(validationConfig, config.saveProfile);
  validator.enableValidation();
  validator.clearValidationErrors(config.profileInputList);
  config.profileInputName.value = config.profileTitle.textContent;
  config.profileInputJob.value = config.profileSubTitle.textContent;
  const editProfile = new PopupWithForm(popupProfile, (event) => {
    event.preventDefault();
    config.editProfileSubmit.textContent = "Сохранение...";
    api
      .patchUserData(
        config.profileInputName.value,
        config.profileInputJob.value
      )
      .then(() => {
        config.profileTitle.textContent = config.profileInputName.value;
        config.profileSubTitle.textContent = config.profileInputJob.value;
        editProfile.close();
      })
      .finally(() => (config.editProfileSubmit.textContent = "Сохранить"))
      .catch((err) => {
        console.log(err);
      });
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
  addPlace.open()
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
  profileAvatar.open()
  validator.toggleButtonState(config.avatarInputList, config.avatarSubmit);
});

// popupCloseButtonList.forEach((button) =>
//   button.addEventListener("click", (event) => {
//     closePopup(event.target.closest(".popup"));
//   })
// );

config.deleteConfirmButton.addEventListener("click", () => {
  api
    .deleteHandler(config.cardForRemove.id)
    .then(() => {
      config.cardForRemove.remove();
      const acceptConfirm = new Popup(config.popupDeleteConfirm)
      acceptConfirm.close()
    })
    .catch((err) => {
      console.log(err);
    });
});

// config.saveProfile.addEventListener("submit", (event) => {
//   event.preventDefault();
//   config.editProfileSubmit.textContent = "Сохранение...";
//   api
//     .patchUserData(config.profileInputName.value, config.profileInputJob.value)
//     .then(() => {
//       config.profileTitle.textContent = config.profileInputName.value;
//       config.profileSubTitle.textContent = config.profileInputJob.value;
//       closePopup(popupProfile);
//     })
//     .finally(() => (config.editProfileSubmit.textContent = "Сохранить"))
//     .catch((err) => {
//       console.log(err);
//     });
// });

// config.avatarForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   config.avatarSubmit.textContent = "Сохранение...";
//   api
//     .patchAvatar(config.avatarInput.value)
//     .then((data) => {
//       config.profileAvatar.style.backgroundImage = `url(${data.avatar})`;
//       config.avatarInput.value = "";
//       closePopup(popupAvatar);
//     })
//     .finally(() => {
//       config.avatarSubmit.textContent = "Сохранить";
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// config.createPlace.addEventListener("submit", (event) => {
//   event.preventDefault();
//   config.createPlaceSubmit.textContent = "Создание...";
//   addCard();
// });

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    config.profileTitle.textContent = userData.name;
    config.profileSubTitle.textContent = userData.about;
    config.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    config.userId = userData._id;
    const section = new Section(
      {
        items: cards,
        renderer: (item) => {
          const card = new Card(item, config.cardTemplate);
          return card.createCard(card.cardData);
        },
      },
      config.cardsContainer
    );
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
