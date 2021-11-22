//import { config } from "./config";

export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  _isFormValid(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid);
  }

  clearValidationErrors(inputList) {
    inputList.forEach(inputElement => this._hideInputError(inputElement))
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
        this.toggleButtonState(inputList, buttonElement)
      });
    });
  }

  enableValidation() {
    //const forms = Array.from(document.forms)
    const submitButton = Array.from(this.formElement.elements).filter(element => element.type == "submit").pop()
    const inputList = Array.from(this.formElement.elements).filter(element => element.type != "submit")
    this._formValidate(inputList, submitButton)
    // forms.forEach(form => {
    //   const submitButton = Array.from(form.elements).filter(element => element.type == "submit").pop()
    //   const inputList = Array.from(form.elements).filter(element => element.type != "submit")
    //   _formValidate(inputList, submitButton)
    // })
  }
}



//export { enableValidation, clearValidationErrors, toggleButtonState };


// Создайте класс FormValidator, который настраивает валидацию полей формы
// принимает в конструктор объект настроек с селекторами и классами формы
// принимает вторым параметром элемент той формы, которая валидируется
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля,
// изменяют состояние кнопки сабмита, устанавливают все обработчики
// имеет публичный метод enableValidation, который включает валидацию формы.
// Для каждой проверяемой формы создавайте экземпляр класса FormValidator.

