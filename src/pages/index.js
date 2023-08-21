import Card from "../components/card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import   * as constants from '../utils/constants.js';


/* * functions    */
const renderCard = (cardData) => {
  const card = new Card(cardData, constants.selectors.cardTemplate, handleCardClick);
  return card.getView();
};
const popUpImageModal = new PopupWithImage("#image-modal");
function handleCardClick(name, link) {
  popUpImageModal.openModal(name, link);
}


//FormValidation
const editFormValidator = new FormValidator(constants.settings, constants.profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(constants.settings, constants.addModalForm);
addFormValidator.enableValidation();



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
  handleProfileEditSubmit, handleFormFill
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
  newUserInfo.setUserInfo(modalInputs.title, modalInputs.description)
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
