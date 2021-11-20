import { config } from "./config";
import { openPopup } from "./modal";
import { likeHandler } from "./api";
import {api} from "./api";

const changeLikeState = (cardData, cardElement, event) => {
  const likesCounter = cardElement.querySelector(config.likesCounter);
  const cardLike = cardElement.querySelector(config.cardLike);
  likesCounter.textContent = cardData.likes.length.toString();
  if (cardData.likes.some((el) => el._id == config.userId)) {
    cardLike.classList.add(config.cardLikeActive);
    if (event) {
      api.likeHandler(cardData._id, "DELETE")
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
      api.likeHandler(cardData._id, "PUT")
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
};

const createCard = (cardData) => {
  const cardElement = config.cardTemplate
    .querySelector(config.cardElement)
    .cloneNode(true);
  const elementImage = cardElement.querySelector(config.elementImage);
  const deleteButton = cardElement.querySelector(config.cardDelete);
  const popupImage = document.querySelector(`.${config.popupImage}`);

  changeLikeState(cardData, cardElement);

  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;
  elementImage.addEventListener("click", () => {
    const image = config.image;
    image.src = cardData.link;
    image.alt = cardData.name;
    config.popupPictureCaption.textContent = cardData.name;
    openPopup(popupImage);
  });
  cardElement.querySelector(config.cardTitle).textContent = cardData.name;
  if (cardData.owner._id != config.userId) {
    deleteButton.style.display = "none";
  }
  deleteButton.addEventListener("click", (event) => {
    event.target.parentElement.id = cardData._id;
    config.cardForRemove = event.target.parentElement;
    openPopup(config.popupDeleteConfirm);
  });

  cardElement
    .querySelector(config.cardLike)
    .addEventListener("click", (event) => {
      changeLikeState(cardData, cardElement, event);
    });

  return cardElement;
};

export { createCard };
