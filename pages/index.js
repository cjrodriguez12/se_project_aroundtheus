import Card from "../components/card.js";
import formValidator from "../components/formValidator.js";
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
];

export const renderCard = (card) => {
  const cardListEl = document.querySelector(".gallery__cards");

  cardListEl.prepend(card);
};
const settings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
 initialCards.forEach((cardElement) => {
   const card = new Card(cardElement, "#card-template");
  renderCard(card.getView());
});

const profileEditModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#add-modal");
const addModalForm = addModal.querySelector("#add-modal-form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
 const editFormValidator = new formValidator(settings, profileEditForm);
 editFormValidator.enableValidation();
 const addFormValidator = new formValidator(settings, addModalForm);
addFormValidator.enableValidation();
