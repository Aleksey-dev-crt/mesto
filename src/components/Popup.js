export default class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleBtnClose = this._handleBtnClose.bind(this);
  }

  open() {
    this.popupElement.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  }

  _handleBtnClose(event) {
    if (event.target.classList.contains("popup__button-close")) {
      this.close();
    }
  }

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
