import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this.submitHandler = submitHandler;
    this._inputList = Array.from(this.popupElement.querySelector(".popup__form").elements).filter(
      (element) => element.type != "submit"
    );
    this._form = this.popupElement.querySelector(".popup__form");
    this.formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach(input => this.formValues[input.name] = input.value);
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
    this._form.reset()
  }
}
