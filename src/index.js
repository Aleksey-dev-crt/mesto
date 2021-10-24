import { config } from "./components/config";
import { addCard, initial } from "./components/card";
import { closePopup, openPopup } from "./components/modal";

import './pages/index.css';

const deleteIcon = new URL('./images/Delete-Icon.svg', import.meta.url);
const elementLikeActive = new URL('./images/Element-Like_active.svg', import.meta.url);
const elementLike = new URL('./images/Element-Like.svg', import.meta.url);
const logo = new URL('./images/Logo.svg', import.meta.url);
const modalCloseIcon = new URL('./images/Modal-Close-Icon.svg', import.meta.url);
const profileAddButton = new URL('./images/Profile-Add_button.svg', import.meta.url);
const profileEditButton = new URL('./images/Profile-Edit_button.svg', import.meta.url);
const placeholderImage = new URL('./images/placeholder-image.jpg', import.meta.url);
const profileAvatar = new URL('./images/Profile-Avatar.jpg', import.meta.url);

const Images = [
  { name: 'Delete Icon', image: deleteIcon },
  { name: 'Like Active', link: elementLikeActive },
  { name: 'Like', link: elementLike },
  { name: 'Logo', image: logo },
  { name: 'Close Modal', link: modalCloseIcon },
  { name: 'Add Button', link: profileAddButton },
  { name: 'Edit Button', image: profileEditButton },
  { name: 'Placeholder Image', link: placeholderImage },
  { name: 'Profile Avatar', link: profileAvatar },
];

config.editProfile.addEventListener("click", () => {
  config.profileInputName.value = config.profileTitle.textContent;
  config.profileInputJob.value = config.profileSubTitle.textContent;
  openPopup(document.querySelector(`.${config.popupProfile}`));
});

config.addPlace.addEventListener("click", () => openPopup(document.querySelector(`.${config.popupCardAdd}`)));

document.addEventListener("click", event => {
  const isButtonCloseClicked = event.target.classList.contains(config.popupCloseBtn);
  const isOverlayProfileClicked = event.target.classList.contains(config.popupProfile);
  const isOverlayPlaceClicked = event.target.classList.contains(config.popupCardAdd);
  const isOverlayPictureClicked = event.target.classList.contains(config.popupImage);
  if (isButtonCloseClicked || isOverlayProfileClicked) closePopup(document.querySelector(`.${config.popupProfile}`));
  if (isButtonCloseClicked || isOverlayPlaceClicked) closePopup(document.querySelector(`.${config.popupCardAdd}`));
  if (isButtonCloseClicked || isOverlayPictureClicked) closePopup(document.querySelector(`.${config.popupImage}`));
});

document.addEventListener("keydown", event => {
if (event.key === "Escape") {
    closePopup(document.querySelector(`.${config.popupProfile}`));
    closePopup(document.querySelector(`.${config.popupCardAdd}`));
    closePopup(document.querySelector(`.${config.popupImage}`));
  }
});

config.saveProfile.addEventListener("submit", event => {
  event.preventDefault();
  config.profileTitle.textContent = config.profileInputName.value;
  config.profileSubTitle.textContent = config.profileInputJob.value;
  closePopup(document.querySelector(`.${config.popupProfile}`));
});

config.createPlace.addEventListener("submit", event => {
  event.preventDefault();
  addCard();
});

initial(config.initialCards, config.cardsContainer);


