export class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
  }
  openModal() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
  }
  closeModal() {
    this._popUpElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeModalByEscape);
  }
  _closeModalByEscape = (e) => {
    if (e.key === "Escape") {
      this.closeModal();
    }
  };
  _closeModalOnRemoteClick = (evt) => {
    //"." isn't required for classlist
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("modal__container") || 
      evt.target.classList.contains("modal__container-close") 
      
    ) {
      this.closeModal();
    }
  };
  setEventListeners() {
    this._popUpElement.addEventListener("click", this._closeModalOnRemoteClick);
  }
}
