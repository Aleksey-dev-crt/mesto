import { config } from "./config";
import { hideInputError } from "./validate";
import { enableValidation } from "./validate";

const openPopup = (popup) => {
  popup.classList.add(config.popupOpened);
  enableValidation();
}

const closePopup = (popup) => {
  popup.classList.remove(config.popupOpened);
  Array.from(config.popupInputs).forEach(inputElement => hideInputError(inputElement))
}

export {openPopup, closePopup};


