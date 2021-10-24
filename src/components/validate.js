import { config } from "./config";

const isFormValid = (inputList) => {
  return inputList.every((inputElement) => inputElement.validity.valid);
};

const hideInputError = (inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
};

const showInputError = (inputElement) => {
  const errorElement = document.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const toggleButtonState = (inputList, buttonElement) => {
  if (isFormValid(inputList)) {
    buttonElement.disabled = false;
  } else {
    buttonElement.disabled = true;
  }
};

const checkInputValidity = (inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement);
  } else {
    showInputError(inputElement);
  }
};

const formValidate = (inputList, buttonElement) => {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const inputListProfile = Array.from(config.saveProfile.elements);
  const inputListPlace = Array.from(config.createPlace.elements);
  const submitButtonProfile = config.saveProfile.elements.saveProfile;
  const submitButtonPlace = config.createPlace.elements.addPlace;

  if (config.editProfile) {
    formValidate(inputListProfile, submitButtonProfile);
    toggleButtonState(inputListProfile, submitButtonProfile);
  }
  if (config.addPlace) {
    formValidate(inputListPlace, submitButtonPlace);
    toggleButtonState(inputListPlace, submitButtonPlace);
  }
};

export { enableValidation, hideInputError };
