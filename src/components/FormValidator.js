export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  _isFormValid(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid);
  }

  clearValidationErrors(inputList) {
    inputList.forEach((inputElement) => this._hideInputError(inputElement));
  }

  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
  }

  _showInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.validationConfig.inputErrorClass);
  }

  toggleButtonState(inputList, buttonElement) {
    if (this._isFormValid(inputList)) {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _formValidate(inputList, buttonElement) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const submitButton = Array.from(this.formElement.elements)
      .filter((element) => element.type == "submit")
      .pop();
    const inputList = Array.from(this.formElement.elements).filter(
      (element) => element.type != "submit"
    );
    this._formValidate(inputList, submitButton);
  }
}
