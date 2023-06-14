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
/** Profile elements**/
// const profileEditButton = document.querySelector(".profile__edit");
// //const profileClose = profileEditModal.querySelector(".modal__container-close");
// const profileName = document.querySelector(".profile__name");
// const profileDescription = document.querySelector(".profile__description");
// /** Profile Form elements**/
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector(
//   "#profile-description-input"
// );

// /** ADD Form elements**/
// const addTitleInput = document.querySelector("#add-title-input");
// const addUrlInput = document.querySelector("#URL-input");
// /** Add gallery elements**/

// const addButton = document.querySelector(".profile__add-button");
// //const addClose = addModal.querySelector(".modal__container-close");
// //const modalImage = document.querySelector(".modal__image");
// //const imageTitle = document.querySelector(".modal__box-image-title");
// const addSubmitButton = addModal.querySelector("#add-modal-submit");


/**card elements */
// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");
//previewImageModal = document.querySelector("#image-modal");
/**image element */
//const previewClose = previewImageModal.querySelector(".modal__container-close");
/**functions */

//function openModal(modal) {
//  modal.classList.add("modal_opened");
//  document.addEventListener("keydown", closeModalByEscape);
// }
// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalByEscape);
// }
//  function renderCard(cardData) {
//    const cardElement = getCardElement(cardData);
//    cardListEl.prepend(cardElement);
//  }
const Settings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const profileEditModal = document.querySelector("#profile-edit-modal");
const addModal = document.querySelector("#add-modal");
const addModalForm = addModal.querySelector("#add-modal-form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const editFormValidator = new formValidator(Settings, profileEditForm);
const addFormValidator = new formValidator(Settings, addModalForm);

// function getCardElement(cardData) {
//   //clone template
//   const cardElement = cardTemplate.cloneNode(true);
//   //access title and image
//   const cardImageEl = cardElement.querySelector(".gallery__card-image");
//   const cardTitleEl = cardElement.querySelector(".gallery__card-title");
//   const likeBtn = cardElement.querySelector(".gallery__card-button");
  //find delete button
  //const deleteBtn = cardElement.querySelector(".gallery__card-delete");
  // add event listener to delete
  //use .remove
  //deleteBtn.addEventListener("click", () => {
    //cardElement.remove();
  //};
  
  // add click listner to image
  //cardImageEl.addEventListener("click", () => {
    //imageTitle.textContent = cardData.name;
    //modalImage.src = cardImageEl.src;
    //modalImage.alt = "Photo of " + `${cardData.name}`;

    //openModal(previewImageModal);
  //});
  //find image andd modify
  //likeBtn.addEventListener("click", () => {
    //likeBtn.classList.toggle("gallery__card-button_active");
  //});
  //set path to image
  //cardImageEl.src = cardData.link;
  //set alt text to name
  //cardImageEl.alt = cardData.name;
  //set title to card name
  //cardTitleEl.textContent = cardData.name;

  //return ready html
  //return cardElement;
//}

/**Event Handler */
// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileName.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closeModal(profileEditModal);
// }
// function handleAddModalSubmit(e) {
//   e.preventDefault();
//   const name = addTitleInput.value;
//   const link = addUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   e.target.reset();
//   toggleButtonState([addTitleInput, addUrlInput], addSubmitButton, config);
//   closeModal(addModal);
// }

// function closeModalOnRemoteClick(evt) {
//   if (
//     evt.currentTarget === evt.target ||
//     evt.target.classList.contains("modal__container") ||
//     evt.target.classList.contains("modal__container-close") ||
//     evt.target.classList.contains("modal__container-image")
//   ) {
//     closeModal(evt.currentTarget);
//   }
// }
// function closeModalByEscape(e) {
//   if (e.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }
// profileEditModal.addEventListener("mousedown", (evt) =>
//   closeModalOnRemoteClick(evt, profileEditModal)
// );
// addModal.addEventListener("mousedown", (evt) =>
//   closeModalOnRemoteClick(evt, addModal)
// );
// previewImageModal.addEventListener("mousedown", (evt) =>
//   closeModalOnRemoteClick(evt, previewImageModal)
// );
/**form Listener */
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// addModalForm.addEventListener("submit", handleAddModalSubmit);
// /**Event Listeners */
// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// });
// profileClose.addEventListener("click", () => closeModal(profileEditModal));
// previewClose.addEventListener("click", () => closeModal(previewImageModal));
// /**addButton Event Listeners */
// addButton.addEventListener("click", () => {
//   openModal(addModal);
// });
// addClose.addEventListener("click", () => closeModal(addModal));

  initialCards.forEach((cardElement) => {
    const card = new Card(cardElement, "#card-template")
    renderCard(card.getView());
  });
function renderCard(cardElement){
  cardListEl.prepend(cardElement);
}