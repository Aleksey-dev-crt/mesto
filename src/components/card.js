import { config } from "./Config";
import Popup from "./Popup";

export default class Card {
  constructor(cardData, cardTemplate, api, handleCardClick) {
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
    this.handleCardClick = handleCardClick;
    this.api = api;
  }

  _changeLikeState(cardData, cardElement, event) {
    const likesCounter = cardElement.querySelector(config.likesCounter);
    const cardLike = cardElement.querySelector(config.cardLike);
    likesCounter.textContent = cardData.likes.length.toString();
    if (cardData.likes.some((el) => el._id == config.userId)) {
      cardLike.classList.add(config.cardLikeActive);
      if (event) {
        this.api
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
        this.api
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

  _handleDeleteButton(event) {
    event.target.parentElement.id = this.cardData._id;
    config.cardForRemove = event.target.parentElement;
    const deleteConfirm = new Popup(config.popupDeleteConfirm);
    deleteConfirm.open();
  }

  createCard() {
    const cardElement = config.cardTemplate
      .querySelector(config.cardElement)
      .cloneNode(true);
    const elementImage = cardElement.querySelector(config.elementImage);
    const deleteButton = cardElement.querySelector(config.cardDelete);

    this._changeLikeState(this.cardData, cardElement);

    elementImage.src = this.cardData.link;
    elementImage.alt = this.cardData.name;
    elementImage.addEventListener("click", this.handleCardClick);
    cardElement.querySelector(config.cardTitle).textContent =
      this.cardData.name;
    if (this.cardData.owner._id != config.userId)
      deleteButton.style.display = "none";

    deleteButton.addEventListener("click", this._handleDeleteButton);

    cardElement
      .querySelector(config.cardLike)
      .addEventListener("click", (event) => {
        this._changeLikeState(this.cardData, cardElement, event);
      });

    return cardElement;
  }
}
