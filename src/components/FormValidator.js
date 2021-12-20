export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.elements).filter(
      (element) => element.type != "submit"
    );
    this._submitButton = Array.from(this._formElement.elements)
      .filter((element) => element.type == "submit")
      .pop();
  }

  _isFormValid() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

  clearValidationErrors() {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationConfig.inputErrorClass);
  }

  toggleButtonState() {
    if (this._isFormValid(this._inputList)) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(
        this._validationConfig.buttonDisabledClass
      );
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(
        this._validationConfig.buttonDisabledClass
      );
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _formValidate() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formValidate(this._inputList, this._submitButton);
  }
}
