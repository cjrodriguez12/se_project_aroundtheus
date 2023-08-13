import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Popup } from "../components/Popup.js";
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
]; /**elements */

const profileEditModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#add-modal");
const addModalForm = addModal.querySelector("#add-modal-form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".profile__add-button");
/* * functions    */
const renderCard = (cardData) => {
  const card = new Card(cardData, selectors.cardTemplate, handleCardClick);

  return card.getView();
};
const popUpImageModal = new PopupWithImage("#image-modal");
function handleCardClick(name, link) {
  popUpImageModal.openModal(name, link);
}

const settings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
//FormValidation
const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addModalForm);
addFormValidator.enableValidation();

const selectors = {
  cardSection: ".gallery__cards",
  cardTemplate: "#card-template",
  popUpSelector: ".modal",
  profileSelector: "#profile-edit-modal",
  addSelector: "#add-modal",
  imageSelector: ".gallery__card-image",
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
};
// call queryselector on input inside form /set values
function handleFormFill(name, description) {
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
}
//Buttons that Open Popup with forms
profileEditButton.addEventListener("click", () => {
  const newCardPopup = new Popup(selectors.profileSelector);
  // grab from userinfo name + description
  const newUserInfo = new UserInfo(selectors, handleFormFill);
  newUserInfo.getUserInfo();

  return newCardPopup.openModal();
});
const newPopUpWithForm = new PopupWithForm(
  selectors.profileSelector,
  handleProfileEditSubmit
);
newPopUpWithForm.setEventListeners();
const addPopUpWithForm = new PopupWithForm(
  selectors.addSelector,
  handleAddModalSubmit
);
addPopUpWithForm.setEventListeners();
addButton.addEventListener("click", () => {
  const newCardPopup = new Popup(selectors.addSelector);

  return newCardPopup.openModal();
});
//initializes new section renders inittial cards and new ones
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (items) => renderCard(items),
  },
  selectors.cardSection
);
cardSection.renderItems(initialCards);
//Submit Button handler
/**Event Handlers*/
function handleProfileEditSubmit(modalInputs) {
  profileName.textContent = modalInputs.title;
  profileDescription.textContent = modalInputs.description;
  newPopUpWithForm.closeModal();
}
function handleAddModalSubmit(modalInputs) {
  console.log(modalInputs);
  const name = modalInputs.place;
  const link = modalInputs.Url;
  //const card = new Card({ name, link }, "#card-template");
  const newCard = renderCard({ name, link });
  cardSection.addItems(newCard);

  addPopUpWithForm.closeModal();
  addFormValidator.toggleButtonState();
}
