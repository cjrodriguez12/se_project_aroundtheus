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
/** elements**/
const profileEditButton = document.querySelector(".profile__edit");
const profileClose = document.querySelector(".modal__container-close");
const modalOpened = document.querySelector(".modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".gallery__cards");
/**functions */
function openModal() {
  modalOpened.classList.add("modal_opened");
  profileTitleInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}
function closeModal() {
  modalOpened.classList.remove("modal_opened");
}
function getCardElement(cardData) {
  //clone template
  const cardElement = cardTemplate.cloneNode(true);
  //access title and image
  const cardImageEl = cardElement.querySelector(".gallery__card-image");
  const cardTitleEl = cardElement.querySelector(".gallery__card-title");
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
  closeModal();
}
/**Event Listener */
profileEditButton.addEventListener("click", openModal);
profileClose.addEventListener("click", closeModal);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
