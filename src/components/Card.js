export default class Card {
  constructor(
    cardData,
    cardTemplate,
    config,
    api,
    handleCardClick,
    deleteConfirm
  ) {
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this.config = config;
    this.cardElement = this.cardTemplate
      .querySelector(this.config.cardElement)
      .cloneNode(true);
    this._cardLike = this.cardElement.querySelector(this.config.cardLike);
    this._likesCounter = this.cardElement.querySelector(
      this.config.likesCounter
    );
    this._elementImage = this.cardElement.querySelector(
      this.config.elementImage
    );
    this._deleteButton = this.cardElement.querySelector(this.config.cardDelete);
    this._handleDeleteButton = this._handleDeleteButton.bind(this);
    this.api = api;
    this.handleCardClick = handleCardClick;
    this.deleteConfirm = deleteConfirm;
  }

  _setLikesCount() {
    this._likesCounter.textContent = this.cardData.likes.length.toString();
    if (this.cardData.likes.some((el) => el._id == this.config.userId)) {
      this._cardLike.classList.add(this.config.cardLikeActive);
    } else {
      this._cardLike.classList.remove(this.config.cardLikeActive);
    }
  }

  _changeLikeState() {
    if (this._cardLike.classList.contains(this.config.cardLikeActive)) {
      this.api
        .likeHandler(this.cardData._id, "DELETE")
        .then((res) => {
          this._cardLike.classList.remove(this.config.cardLikeActive);
          this._likesCounter.textContent = res.likes.length.toString();
          this.cardData.likes = res.likes;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.api
        .likeHandler(this.cardData._id, "PUT")
        .then((res) => {
          this._cardLike.classList.add(this.config.cardLikeActive);
          this._likesCounter.textContent = res.likes.length.toString();
          this.cardData.likes = res.likes;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _handleDeleteButton(event) {
    event.target.parentElement.id = this.cardData._id;
    this.config.cardForRemove = event.target.parentElement;
    this.deleteConfirm.open();
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", this.handleCardClick);
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._cardLike.addEventListener("click", () => {
      this._changeLikeState();
    });
  }

  createCard() {
    this._setLikesCount();
    this._elementImage.src = this.cardData.link;
    this._elementImage.alt = this.cardData.name;
    this.cardElement.querySelector(this.config.cardTitle).textContent =
      this.cardData.name;
    if (this.cardData.owner._id != this.config.userId)
      this._deleteButton.style.display = "none";
    this._setEventListeners();

    return this.cardElement;
  }
}
