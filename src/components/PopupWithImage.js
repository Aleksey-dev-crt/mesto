import Popup from "./Popup";

export default class PopupWithImage extends Popup {
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
