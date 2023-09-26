import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import * as constants from "../utils/constants.js";

/* * functions    */
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    constants.selectors.cardTemplate,
    handleCardClick
  );
  return card.getView();
};
const popUpImageModal = new PopupWithImage("#image-modal");
popUpImageModal.setEventListeners();
function handleCardClick(name, link) {
  popUpImageModal.openModal(name, link);
}

//FormValidation
<<<<<<< Updated upstream
const editFormValidator = new FormValidator(
=======
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
const avatarFormValidator = new FormValidator(
>>>>>>> Stashed changes
  constants.settings,
  constants.profileEditForm
);
<<<<<<< Updated upstream
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(
  constants.settings,
  constants.addModalForm
);
addFormValidator.enableValidation();

=======
avatarFormValidator.enableValidation();
>>>>>>> Stashed changes
// call queryselector on input inside form /set values
function handleFormFill(userInfoList) {
  constants.profileTitleInput.value = userInfoList.name;
  constants.profileDescriptionInput.value = userInfoList.description;
}
//Buttons that Open Popup with forms
const newUserInfo = new UserInfo(constants.selectors);
constants.profileEditButton.addEventListener("click", () => {
  // grab from userinfo name + descriptions
  handleFormFill(newUserInfo.getUserInfo());

  return profilePopup.openModal();
});
const profilePopup = new PopupWithForm(
  constants.selectors.profileSelector,
  handleProfileEditSubmit
);
profilePopup.setEventListeners();
const cardPopUp = new PopupWithForm(
  constants.selectors.addSelector,
  handleAddModalSubmit
);
cardPopUp.setEventListeners();
constants.addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  return cardPopUp.openModal();
});
//initializes new section renders inittial cards and new ones
const cardSection = new Section(
  {
    items: constants.initialCards,
    renderer: renderCard,
  },
  constants.selectors.cardSection
);
cardSection.renderItems(constants.initialCards);
//Submit Button handler
/**Event Handlers*/
function handleProfileEditSubmit(modalInputs) {
  newUserInfo.setUserInfo(modalInputs.title, modalInputs.description);
  profilePopup.closeModal();
}
function handleAddModalSubmit(modalInputs) {
  const name = modalInputs.place;
  const link = modalInputs.Url;
  //const card = new Card({ name, link }, "#card-template");
  const newCard = renderCard({ name, link });
  cardSection.addItems(newCard);

  cardPopUp.closeModal();
}
