
 /**elements */

 export const profileEditModal = document.querySelector("#profile-edit-modal");
 export const addModal = document.querySelector("#add-modal");
 export const addModalForm = addModal.querySelector("#add-modal-form");
 export const profileEditForm = profileEditModal.querySelector(".modal__form");
 export const profileName = document.querySelector(".profile__name");
 export const profileDescription = document.querySelector(".profile__description");
 export const profileTitleInput = document.querySelector("#profile-title-input");
 export const profileDescriptionInput = document.querySelector(
   "#profile-description-input"
 );
 export const profileEditButton = document.querySelector(".profile__edit");
 export const addButton = document.querySelector(".profile__add-button");
 export const avatarModal = document.querySelector("#avatar-modal");
 export const avatarForm = avatarModal.querySelector("#avatar-modal-form");
 export const avatarButton = document.querySelector(".avatar-img");
 export const dltPopup = document.querySelector("#delete-modal");
 export const settings = {
    inputSelector: ".modal__form-input",
    submitButtonSelector: ".modal__form-button",
    inactiveButtonClass: "modal__form-button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  export const selectors = {
  cardSection: ".gallery__cards",
  cardTemplate: "#card-template",
  popUpSelector: ".modal",
  profileSelector: "#profile-edit-modal",
  addSelector: "#add-modal",
  imageSelector: ".gallery__card-image",
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: "#avatar-modal",
  deleteSelector: "#delete-modal",
  dltButtonSelector: ".gallery__card-delete",
  likeSelector: ".gallery__card-button"
};