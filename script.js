const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__button-close");
const popupEditProfile = document.querySelector(".popup");
const popupInput = document.querySelectorAll(".popup__input");
const popupButtonSave = document.querySelector(".popup__button-save");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

closeButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

popupButtonSave.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupInput.forEach(element => {
    let inputName = element.getAttribute("name");
    if (inputName === "name") {
      inputValue = element.value;
      profileTitle.textContent = inputValue;
    }
    if (inputName === "description") {
      inputValue = element.value;
      profileSubTitle.textContent = inputValue;
    }
  });
  closePopup(popupEditProfile);
});
