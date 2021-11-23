export class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
    this._handleBtnClose = this._handleBtnClose.bind(this)
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    this.setEventListeners()
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    this.removeEventListeners()
  }

  _handleEscClose(event) {
      if (event.key === "Escape") {
        this.close()
      }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("popup")) {
      this.close()
    }
  }

  _handleBtnClose(event) {
    if (event.target.classList.contains("popup__button-close")) {
      this.close()
    }
};

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("click", this._handleBtnClose);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("click", this._handleBtnClose);
  }


}

export class PopupWithImage extends Popup {
  constructor(popupElement, imageSrc, imageName, imageElement, imageCaption) {
    super(popupElement)
    this.imageSrc = imageSrc
    this.imageName = imageName
    this.imageElement = imageElement
    this.imageCaption = imageCaption
  }

  open() {
    super.open();
    this.imageElement.src = this.imageSrc;
    this.imageElement.alt = this.imageName;
    this.imageCaption.textContent = this.imageName;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupElement, submitHandler) {
    super(popupElement);
    this.submitHandler = submitHandler;
  }

  _getInputValues() {
    // собирает данные всех полей формы
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

