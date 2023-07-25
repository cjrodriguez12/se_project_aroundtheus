import Card from "/components/Card.js";
import FormValidator from "/components/FormValidator.js";
import Section from "/components/Section";
import {openModal, closeModal} from "/utils/utils.js";
import "../pages/index.css";
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
];/**elements */
const previewImageModal = document.querySelector("#image-modal");
const previewClose = previewImageModal.querySelector(".modal__container-close");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileClose = profileEditModal.querySelector(".modal__container-close");
const addModal = document.querySelector("#add-modal");
const addClose = addModal.querySelector(".modal__container-close");

const addModalForm = addModal.querySelector("#add-modal-form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addSubmitButton = addModal.querySelector("#add-modal-submit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditButton = document.querySelector(".profile__edit");
const addTitleInput = document.querySelector("#add-title-input");
const addUrlInput = document.querySelector("#URL-input");
const addButton = document.querySelector(".profile__add-button");
/* * functions    */
const renderCard = (card) => {
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


const editFormValidator = new FormValidator(settings, profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addModalForm);
addFormValidator.enableValidation();

/**Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}
function handleAddModalSubmit(e) {
  e.preventDefault();
  const name = addTitleInput.value;
  const link = addUrlInput.value;
  const card = new Card({ name, link }, "#card-template");
  renderCard(card.getView());
  e.target.reset();
  addFormValidator.toggleButtonState();
  closeModal(addModal);
};
/**Event listeners 
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddModalSubmit);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
addButton.addEventListener("click", () => {
  openModal(addModal);
});
function closeModalOnRemoteClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("modal__container") ||
    evt.target.classList.contains("modal__container-close") ||
    evt.target.classList.contains("modal__container-image")
  ) {
    closeModal(evt.currentTarget);
  }
};
/**Event listeners
profileEditModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, profileEditModal)
);
addModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, addModal)
);
previewImageModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, previewImageModal)
);

profileClose.addEventListener("click", () => closeModal(profileEditModal));
previewClose.addEventListener("click", () => closeModal(previewImageModal));
addClose.addEventListener("click", () => closeModal(addModal)); */

const CardSection = new Section({
  renderer: (items)=>{
    const cardEl = new Card(items, selectors.cardTemplate);
    CardSection.addItems(cardEl.getView());
  },
  selector: selectors.cardSection,
})
const selectors = {
  cardSection: 'gallery__cards',
  cardTemplate: 'card-template',
}

CardSection.renderItems(initialCards);