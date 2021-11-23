import { config } from "./config";
import { Popup, PopupWithImage } from "./modal";
// import { likeHandler } from "./api";
import { api } from "./api";

export default class Card {
  constructor(cardData, cardTemplate, handleCardClick) {
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this.handleCardClick = handleCardClick;
  }

  _changeLikeState(cardData, cardElement, event) {
    const likesCounter = cardElement.querySelector(config.likesCounter);
    const cardLike = cardElement.querySelector(config.cardLike);
    likesCounter.textContent = cardData.likes.length.toString();
    if (cardData.likes.some((el) => el._id == config.userId)) {
      cardLike.classList.add(config.cardLikeActive);
      if (event) {
        api
          .likeHandler(cardData._id, "DELETE")
          .then((res) => {
            event.target.classList.remove(config.cardLikeActive);
            likesCounter.textContent = res.likes.length.toString();
            cardData.likes = res.likes;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      cardLike.classList.remove(config.cardLikeActive);
      if (event) {
        api
          .likeHandler(cardData._id, "PUT")
          .then((res) => {
            event.target.classList.add(config.cardLikeActive);
            likesCounter.textContent = res.likes.length.toString();
            cardData.likes = res.likes;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  createCard(cardData) {
    const cardElement = config.cardTemplate
      .querySelector(config.cardElement)
      .cloneNode(true);
    const elementImage = cardElement.querySelector(config.elementImage);
    const deleteButton = cardElement.querySelector(config.cardDelete);
    const popupImage = document.querySelector(`.${config.popupImage}`);

    this._changeLikeState(cardData, cardElement);

    elementImage.src = cardData.link;
    elementImage.alt = cardData.name;
    elementImage.addEventListener("click", () => {
      const image = new PopupWithImage(
        popupImage,
        cardData.link,
        cardData.name,
        config.image,
        config.popupPictureCaption
      );
      image.open();
    });
    cardElement.querySelector(config.cardTitle).textContent = cardData.name;
    if (cardData.owner._id != config.userId) {
      deleteButton.style.display = "none";
    }
    deleteButton.addEventListener("click", (event) => {
      event.target.parentElement.id = cardData._id;
      config.cardForRemove = event.target.parentElement;
      const deleteConfirm = new Popup(config.popupDeleteConfirm);
      deleteConfirm.open();
    });

    cardElement
      .querySelector(config.cardLike)
      .addEventListener("click", (event) => {
        this._changeLikeState(cardData, cardElement, event);
      });

    return cardElement;
  }
}
