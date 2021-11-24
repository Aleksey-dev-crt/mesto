import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this.submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener("submit", this.submitHandler)
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.popupElement.removeEventListener("submit", this.submitHandler)
  }

  close() {
    super.close();
    this.popupElement.querySelector(".popup__form").reset()
  }
}
