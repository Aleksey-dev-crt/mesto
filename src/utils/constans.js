import { config } from "./config"

export const deleteIcon = new URL("../images/Delete-Icon.svg", import.meta.url);
export const elementLikeActive = new URL(
  "../images/Element-Like_active.svg",
  import.meta.url
);
export const elementLike = new URL("../images/Element-Like.svg", import.meta.url);
export const logo = new URL("../images/Logo.svg", import.meta.url);
export const modalCloseIcon = new URL(
  "../images/Modal-Close-Icon.svg",
  import.meta.url
);
export const profileAddButton = new URL(
  "../images/Profile-Add_button.svg",
  import.meta.url
);
export const profileEditButton = new URL(
  "../images/Profile-Edit_button.svg",
  import.meta.url
);
export const placeholderImage = new URL(
  "../images/placeholder-image.jpg",
  import.meta.url
);
export const profileAvatar = new URL("../images/Profile-Avatar.jpg", import.meta.url);

export const Images = [
  { name: "Delete Icon", image: deleteIcon },
  { name: "Like Active", link: elementLikeActive },
  { name: "Like", link: elementLike },
  { name: "Logo", image: logo },
  { name: "Close Modal", link: modalCloseIcon },
  { name: "Add Button", link: profileAddButton },
  { name: "Edit Button", image: profileEditButton },
  { name: "Placeholder Image", link: placeholderImage },
  { name: "Profile Avatar", link: profileAvatar },
];

export const popupCardAdd = document.querySelector(`.${config.popupCardAdd}`);
export const popupProfile = document.querySelector(`.${config.popupProfile}`);
export const popupImage = document.querySelector(`.${config.popupImage}`);
export const popupAvatar = document.querySelector(`.${config.popupAvatar}`);
export const validationConfig = {
  inputErrorClass: "popup__input_type_error",
};
