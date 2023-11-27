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
const confirmPopup = new PopupWithForm(constants.selectors.deleteSelector);
confirmPopup.setEventListeners();
function handleDelete(id, card) {
  confirmPopup.openModal();
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCards(id)
      .then(() => {
        confirmPopup.closeModal();
        card.deleteUI();
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      })

      .finally(() => {
        constants.dltFormSubmit.innerText = "Yes";
      });
  });
}
//Handler for the Like button
function handleToggleLikes(id, isLiked, card) {
  if (isLiked === false) {
    isLiked = true;
    api
      .toLike(id)
      .then(() => {
        card.handleLike();
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  } else {
    isLiked = false;
    api
      .notLiked(id)
      .then(() => {
        card.handleLike();
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
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
//Buttons that Open Popup with forms
// grab from userinfo name + descriptions
const newUserInfo = new UserInfo(constants.selectors);
constants.profileEditButton.addEventListener("click", () => {
  handleFormFill(newUserInfo.getUserInfo());
  return profilePopup.openModal();
});
constants.addButton.addEventListener("click", () => {
  return cardPopUp.openModal();
});

constants.profileAvatar.addEventListener("click", () => {
  return avatarPopUp.openModal();
});

//initializes new section renders inittial cards and new ones
let cardSection;
api
  .getInitialCards()
  .then((data) => {
    cardSection = new Section(
      {
        items: data,
        renderer: renderCard,
      },
      constants.selectors.cardSection
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

//Submit Button handler
//Toggle Submit button State
/**Event Handlers*/
function handleProfileEditSubmit(modalInputs, popUpForm) {
  api
    .updateInfo(modalInputs)
    .then(() => {
      const { title, description } = modalInputs;
      newUserInfo.setUserInfo(title, description);
      editFormValidator.toggleButtonState();
      profilePopup.closeModal();
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
    });
}
function handleAddModalSubmit(modalInputs, popUpForm) {
  api
    .postCards(modalInputs)
    .then((res) => {
      const newCard = renderCard(res);
      cardSection.addItems(newCard);
      popUpForm.reset();
      addFormValidator.toggleButtonState();
      cardPopUp.closeModal();
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
    });
}
function handleAvatarSubmit(modalInputs, popUpForm) {
  api
    .updateAvatar(modalInputs)
    .then(() => {
      newUserInfo.setAvatar(modalInputs.Url);
      popUpForm.reset();
      avatarFormValidator.toggleButtonState();
      avatarPopUp.closeModal();
    })
    .catch((err) => {
      console.error(err); // log the error to the console
    })
    .finally(() => {
      popUpForm.querySelector(".modal__form-button").innerText = "Save";
    });
}
api
  .loadInfo()
  .then((data) => {
    const { name, about, avatar } = data;
    newUserInfo.setUserInfo(name, about);
    newUserInfo.setAvatar(avatar);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });
