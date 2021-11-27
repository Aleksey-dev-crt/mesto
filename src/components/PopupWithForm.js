import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this._handleSubmitBtn = this._handleSubmitBtn.bind(this);
    this.submitHandler = submitHandler;
    this._inputList = Array.from(this.popupElement.querySelector(".popup__form").elements).filter(
      (element) => element.type != "submit"
    );
    this._submitButton = this.popupElement.querySelector(".popup__button-save");
    this._form = this.popupElement.querySelector(".popup__form");
    this._formValues = {};
  }

  _getInputValues() {
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
  }

  _handleSubmitBtn(event) {
      event.preventDefault();
      this._getInputValues();
      this.submitHandler(this._formValues);
      this._submitButton.disabled = true;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupElement.addEventListener("submit", this._handleSubmitBtn)
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.popupElement.removeEventListener("submit", this._handleSubmitBtn)
  }

  close() {
    super.close();
    this._form.reset()
  }
}
