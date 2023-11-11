import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import * as constants from "../utils/constants.js";
import { Api } from "../components/Api.js";

/* * functions    */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
    "Content-Type": "application/json",
  },
});

const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    constants.selectors.cardTemplate,
    constants.selectors.deleteSelector,
    handleCardClick,
    handleDelete
  );
  return card.getView();
};
const popUpImageModal = new PopupWithImage("#image-modal");
popUpImageModal.setEventListeners();
function handleCardClick(name, link) {
  popUpImageModal.openModal(name, link);
}
const dltPopup = new PopupWithForm(
  constants.selectors.deleteSelector,
  
  );
dltPopup.setEventListeners();
function handleDelete(id, card){
  dltPopup.openModal();
  dltPopup.setSubmitAction(()=>{
          console.log(id,card);
      console.log('form submitted');
    api.deleteCards(id).then(() => {
     dltPopup.closeModal();
     card.remove();
     card=null;
    })
  });
}

//FormValidation

const editFormValidator = new FormValidator(
  constants.settings,
  constants.profileEditForm
);
editFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(
  constants.settings,
  constants.avatarForm
);
avatarFormValidator.enableValidation();
const addFormValidator = new FormValidator(
  constants.settings,
  constants.addModalForm
);
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

const avatarPopUp = new PopupWithForm(
  constants.selectors.avatarSelector,
  handleAvatarSubmit
);
constants.avatarButton.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  return avatarPopUp.openModal();
});
avatarPopUp.setEventListeners();


//initializes new section renders inittial cards and new ones
let cardSection;
api.getInitialCards().then((data) => {
  cardSection = new Section(
    {
      items: data,
      renderer: renderCard,
    },
    constants.selectors.cardSection
  );
  cardSection.renderItems();
});


//Submit Button handler
/**Event Handlers*/
function handleProfileEditSubmit(modalInputs) {
  //newUserInfo.setUserInfo(modalInputs.title, modalInputs.description);
  api.updateInfo(modalInputs).then(() => {
    const { title, description } = modalInputs;
    newUserInfo.setUserInfo(title, description);
    profilePopup.closeModal();
  });
}
function handleAddModalSubmit(modalInputs) {
  api.postCards(modalInputs).then(() => {
    const name = modalInputs.place;
    const link = modalInputs.Url;
    const newCard = renderCard({ name, link });
    cardSection.addItems(newCard);
    cardPopUp.closeModal();
  });
}
function handleAvatarSubmit(modalInputs) {
  const link = modalInputs.Url;
  avatarPopUp.closeModal();
}

api.loadInfo().then((data) => {
  const { name, about } = data;
  newUserInfo.setUserInfo(name, about);
});

