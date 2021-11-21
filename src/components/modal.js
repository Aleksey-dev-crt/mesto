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
  if (event.key === "Escape") {
    const currentPopup = document.querySelector(`.${config.popupOpened}`);
    closePopup(currentPopup);
  }
};

const closePopupByOverlay = (event) => {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

export { openPopup, closePopup };






// //================================================================// Popup.js
// // Создайте класс Popup, который отвечает за открытие и закрытие попапа
// class Popup {
//   constructor(popupElement) { // Принимает в конструктор единственный параметр — селектор попапа
//     this.popup = popupElement
//   }

//   // Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа
//   open() {
//     this.popup.classList.add(config.popupOpened);
//     document.addEventListener("keydown", this._handleEscClose);
//     document.addEventListener("click", this._handleOverlayClose);
//   }

//   close() {
//     this.popup.classList.remove(config.popupOpened);
//     document.removeEventListener("keydown", this._handleEscClose);
//     document.removeEventListener("click", this._handleOverlayClose);
//   }

//   // Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc
//   _handleEscClose(event) {
//     if (event.key === "Escape") {
//       const currentPopup = document.querySelector(`.${config.popupOpened}`);
//       closePopup(currentPopup);
//     }
//   }

//   //Про _handleOverlayClose ничего не сказано
//   _handleOverlayClose(event) {
//     if (event.target.classList.contains("popup")) {
//       closePopup(event.target);
//     }
//   }

//   // Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
//   setEventListeners(closeBtnElement) {
//     closeBtnElement.addEventListener('click', this.close)
//   }

// }

// //================================================================// PopupWithImage.js
// // Создайте класс PopupWithImage
// class PopupWithImage extends Popup {
//   constructor(popupElement) {
//     super(popupElement)
//   }

//   open() {
//     super.open();
//     // в методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке
//     const image = config.image;
//     image.src = cardData.link;
//     image.alt = cardData.name;
//     config.popupPictureCaption.textContent = cardData.name;
//   }
// }


// //================================================================//  PopupWithForm.js
// // Создайте класс PopupWithForm
// class PopupWithForm extends Popup {
//   constructor(popupElement, submitHandler) {
//     super(popupElement);
//     this.submitHandler = submitHandler; // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api
//   }

//   _getInputValues() {
//     // собирает данные всех полей формы
//   }

//   setEventListeners() {
//     super.setEventListeners();
//     // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
//   }

//   close() {
//     super.close();
//     // форма должна ещё и сбрасываться
//   }


//   // Для каждого попапа создавайте свой экземпляр класса PopupWithForm
// }

