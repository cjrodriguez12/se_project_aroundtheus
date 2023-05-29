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
const modalEl = document.querySelectorAll(".modal");
/** Profile elements**/
const profileEditButton = document.querySelector(".profile__edit");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileClose = profileEditModal.querySelector(".modal__container-close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
/** Profile Form elements**/
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
/** ADD Form elements**/
const addTitleInput = document.querySelector("#add-title-input");
const addUrlInput = document.querySelector("#URL-input");
/** Add gallery elements**/
const addModal = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addClose = addModal.querySelector(".modal__container-close");
const modalImage = document.querySelector(".modal__image");
const imageTitle = document.querySelector(".modal__box-image-title");
const AddSubmitButton = addModal.querySelector("#add-modal-submit");

const addModalForm = addModal.querySelector("#add-modal-form");
/**card elements */
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");
const previewImageModal = document.querySelector("#image-modal");
/**image element */
const previewClose = previewImageModal.querySelector(".modal__container-close");
/**functions */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (e.key === "Escape") closeModal(modal);
  });
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}
function getCardElement(cardData) {
  //clone template
  const cardElement = cardTemplate.cloneNode(true);
  //access title and image
  const cardImageEl = cardElement.querySelector(".gallery__card-image");
  const cardTitleEl = cardElement.querySelector(".gallery__card-title");
  const likeBtn = cardElement.querySelector(".gallery__card-button");
  //find delete button
  const deleteBtn = cardElement.querySelector(".gallery__card-delete");
  // add event listener to delete
  //use .remove
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  // add click listner to image
  cardImageEl.addEventListener("click", () => {
    imageTitle.textContent = cardData.name;
    modalImage.src = cardImageEl.src;
    //modalImage.alt = "Photo of "${cardData.name};

    openModal(previewImageModal);
  });
  //find image andd modify
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("gallery__card-button_active");
  });
  //set path to image
  cardImageEl.src = cardData.link;
  //set alt text to name
  cardImageEl.alt = cardData.name;
  //set title to card name
  cardTitleEl.textContent = cardData.name;

  //return ready html
  return cardElement;
}

/**Event Handler */
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
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  toggleButtonState([addTitleInput, addUrlInput], AddSubmitButton, config);
  closeModal(addModal);
}

function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the modal
  // if they are the same then we should close the modal
  console.log(evt.target);
  if (
    evt.currentTarget === evt.target 
     ||
     evt.currentTarget.classList.contains("modal__container")
  ) {
    closeModal(evt.target);
  }
}
profileEditModal.addEventListener("mousedown", closeModalOnRemoteClick);
addModal.addEventListener("mousedown", closeModalOnRemoteClick);
previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);
/**form Listener */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddModalSubmit);
/**Event Listeners */
//outside click profile modal
//profileEditModal.addEventListener('mousedown', (e) => {
//  if (
//    e.target.classList.contains("modal") ||
//e.target.classList.contains("modal__container")
//  ){
//closeModal(profileEditModal);
//}
//});
//esc modal close

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileClose.addEventListener("click", () => closeModal(profileEditModal));
previewClose.addEventListener("click", () => closeModal(previewImageModal));
/**addButton Event Listeners */
addButton.addEventListener("click", () => {
  openModal(addModal);
});
addClose.addEventListener("click", () => closeModal(addModal));
addModalForm.addEventListener("submit", handleAddModalSubmit);
//outside click add modal
//addModal.addEventListener('mousedown', (e) => {
//  if (
//    e.target.classList.contains("modal") ||
//    e.target.classList.contains("modal__container")
//  ){
// /   closeModal(addModal);
//  }
//});
//outside click Image modal
//previewImageModal.addEventListener('mousedown', (e) => {
//  if (
//    e.target.classList.contains("modal") ||
//    e.target.classList.contains("modal__image-container")
//  ){
//    closeModal(previewImageModal);
//  }
//});
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
