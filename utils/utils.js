/**ELEMENTS  */
import {renderCard} from "../pages/index.js";
import Card from "../components/card.js";
const modalImage = document.querySelector(".modal__image");
const imageTitle = document.querySelector(".modal__box-image-title");
const cardListEl = document.querySelector(".gallery__cards");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileClose = profileEditModal.querySelector(".modal__container-close");
const previewImageModal = document.querySelector("#image-modal");
const addModal = document.querySelector("#add-modal");
const addClose = addModal.querySelector(".modal__container-close");
const previewClose = previewImageModal.querySelector(".modal__container-close");
const addButton = document.querySelector(".profile__add-button");
const addSubmitButton = addModal.querySelector("#add-modal-submit");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditButton = document.querySelector(".profile__edit");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addModalForm = addModal.querySelector("#add-modal-form");
const addTitleInput = document.querySelector("#add-title-input");
const addUrlInput = document.querySelector("#URL-input");
/**OPEN/CLOSE Functions */
export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}
function closeModalOnRemoteClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("modal__container") ||
    evt.target.classList.contains("modal__container-close") ||
    evt.target.classList.contains("modal__container-image")
  ) {
    closeModal(evt.currentTarget);
  }
}
function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}
/**Event Handlers */
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
  console.log(name, link);
  const card = new Card({name, link}, "#card-template");
  renderCard(card.getView());
  e.target.reset();
  closeModal(addModal);
}
/**Event listeners */
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addModalForm.addEventListener("submit", handleAddModalSubmit);

profileEditModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, profileEditModal)
);
addModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, addModal)
);
previewImageModal.addEventListener("mousedown", (evt) =>
  closeModalOnRemoteClick(evt, previewImageModal)
);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileClose.addEventListener("click", () => closeModal(profileEditModal));
previewClose.addEventListener("click", () => closeModal(previewImageModal));

addButton.addEventListener("click", () => {
  openModal(addModal);
});
addClose.addEventListener("click", () => closeModal(addModal));
