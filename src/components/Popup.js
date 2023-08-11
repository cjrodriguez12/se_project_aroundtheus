export class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
  }
  openModal() {
    this._popUpElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeModalByEscape);
    this.setEventListeners();
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
    console.log(evt.target);
    //"." isn't required for classlist
    if (
      evt.currentTarget === evt.target ||
      evt.target.classList.contains("modal__container") ||
      evt.target.classList.contains("modal__container-close") ||
      evt.target.classList.contains("modal__container-image")
    ) {
      this.closeModal();
    }
  };
  setEventListeners() {
    this._popUpElement
      .querySelector(".modal__container-close")
      .addEventListener("click", () => {
        this.closeModal();
      });
    this._popUpElement.addEventListener("click", this._closeModalOnRemoteClick);
  }
}
