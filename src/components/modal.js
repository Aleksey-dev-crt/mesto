import { config } from "./config";

const openPopup = (popup) => {
  popup.classList.add(config.popupOpened);
  document.addEventListener("keydown", closePopupByEscape);
  document.addEventListener("click", closePopupByOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove(config.popupOpened);
  document.removeEventListener("keydown", closePopupByEscape);
  document.removeEventListener("click", closePopupByOverlay);
};

const closePopupByEscape = (event) => {
  const currentPopup = document.querySelector(`.${config.popupOpened}`);
  if (event.key === "Escape") {
    closePopup(currentPopup);
  }
};

const closePopupByOverlay = (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

export { openPopup, closePopup };
