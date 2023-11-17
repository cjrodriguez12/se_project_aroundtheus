import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
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
    handleDelete,
    handleToggleLikes
  );
  return card.getView();
};
const popUpImageModal = new PopupWithImage("#image-modal");
popUpImageModal.setEventListeners();
function handleCardClick(name, link) {
  popUpImageModal.openModal(name, link);
}
//Popup for deleting cards from API along with handler
const dltPopup = new PopupWithForm(constants.selectors.deleteSelector);
dltPopup.setEventListeners();
function handleDelete(id, card) {
  dltPopup.openModal();
  dltPopup.setSubmitAction(() => {
    api.deleteCards(id).then(() => {
      dltPopup.closeModal();
      card.deleteUI();
    })
    .finally(()=>{
      constants.dltFormSubmit
      .innerText = "Yes";
    })
  });
}
//Handler for the Like button
function handleToggleLikes(id, isLiked, card) {
  if (isLiked === false) {
    card.handleLike();
    isLiked = true;
    api.toLike(id);
  } else {
    card.handleLike();
    isLiked = false;
    api.notLiked(id);
  }
}
//FormValidation
//profile name/description  
const editFormValidator = new FormValidator(
  constants.settings,
  constants.profileEditForm
);
editFormValidator.enableValidation();
//avatar Form - link
const avatarFormValidator = new FormValidator(
  constants.settings,
  constants.avatarForm
);
avatarFormValidator.enableValidation();
//card form place/Url
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
const avatarPopUp = new PopupWithForm(
  constants.selectors.avatarSelector,
  handleAvatarSubmit
);
avatarPopUp.setEventListeners();
//Toggle Submit button State
constants.profileEditButton.addEventListener("click",()=>{
  editFormValidator.toggleButtonState();
  return profilePopup.openModal();
})
constants.addButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  return cardPopUp.openModal();
});

constants.profileAvatar.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  return avatarPopUp.openModal();
});


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
function handleProfileEditSubmit(modalInputs, popUpForm) {
  api
    .updateInfo(modalInputs)
    .then(() => {
      const { title, description } = modalInputs;
      newUserInfo.setUserInfo(title, description);
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
      profilePopup.closeModal();
    });
}
function handleAddModalSubmit(modalInputs, popUpForm) {
  api
    .postCards(modalInputs)
    .then(() => {
      const name = modalInputs.place;
      const link = modalInputs.Url;
      const newCard = renderCard({ name, link });
      cardSection.addItems(newCard);
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
      cardPopUp.closeModal();
    });
}
function handleAvatarSubmit(modalInputs, popUpForm) {
  api
    .updateAvatar(modalInputs)
    .then(() => {
      const link = modalInputs.Url;
      constants.profileAvatar.src = link;
      newUserInfo.setAvatar(link);
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
      avatarPopUp.closeModal();
    });
}
api.loadInfo().then((data) => {
  const { name, about, avatar } = data;
  newUserInfo.setUserInfo(name, about);
  constants.profileAvatar.src = avatar;
});
