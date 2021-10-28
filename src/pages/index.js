import { config, configForValidation } from "../components/config";
import { createCard } from "../components/card";
import { closePopup, openPopup } from "../components/modal";
import { enableValidation, clearValidationErrors, toggleButtonState } from "../components/validate";

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
const popupCloseButtonList = Array.from(document.querySelectorAll(`.${config.popupCloseBtn}`));

const addCard = () => {
  const newCard = {};
  newCard.name = config.placeInputTitle.value;
  newCard.link = config.placeInputLink.value;
  config.cardsContainer.prepend(createCard(newCard));
  config.createPlace.reset();
  closePopup(popupCardAdd);
};

const initial = (data, container) => {
  data.forEach((card) => container.append(createCard(card)));
};

config.editProfile.addEventListener("click", () => {
  clearValidationErrors(config.profileInputList);
  config.profileInputName.value = config.profileTitle.textContent;
  config.profileInputJob.value = config.profileSubTitle.textContent;
  openPopup(popupProfile);
  toggleButtonState(config.profileInputList, config.editProfileSubmit);
});

config.addPlace.addEventListener("click", () => {
  clearValidationErrors(config.createPlaceInputList);
  openPopup(popupCardAdd);
  toggleButtonState(config.createPlaceInputList, config.createPlaceSubmit);
});

popupCloseButtonList.forEach((button) =>
  button.addEventListener("click", (event) => {
    closePopup(event.target.closest(".popup"));
  })
);

config.saveProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  config.profileTitle.textContent = config.profileInputName.value;
  config.profileSubTitle.textContent = config.profileInputJob.value;
  closePopup(popupProfile);
});

config.createPlace.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard();
});

initial(config.initialCards, config.cardsContainer);

enableValidation(configForValidation);
