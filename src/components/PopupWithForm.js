import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popUpSelector, handleModalSubmit) {
    super(popUpSelector);
    this._popUpForm = this._popUpElement.querySelector(".modal__form");
    this._handleModalSubmit = handleModalSubmit;
  }
  closeModal() {
    this._popUpForm.reset();
    super.closeModal();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const modalInputs = this._getInputValues();
      this._handleModalSubmit(modalInputs);
    });
  }
  _getInputValues() {
    const modalInputs = {};
    const modalInputsList =
      this._popUpForm.querySelectorAll(".modal__form-input");
    modalInputsList.forEach((input) => {
      modalInputs[input.name] = input.value;
    });
    return modalInputs;
  }
}
