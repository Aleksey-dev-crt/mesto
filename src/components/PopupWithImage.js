import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupElement, imageElement, imageCaption) {
    super(popupElement)
    this.imageElement = imageElement
    this.imageCaption = imageCaption
  }

  open(imageSrc, imageName) {
    super.open();
    this.imageElement.src = imageSrc;
    this.imageElement.alt = imageName;
    this.imageCaption.textContent = imageName;
  }
}
