import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
  }
  openModal(name, link) {
    this.popUpImage = this._popUpElement.querySelector(".modal__image");
    this.popUpTitle = this._popUpElement.querySelector(
      ".modal__box-image-title"
    );
    this.popUpImage.src = link;
    this.popUpImage.alt = name;
    this.popUpTitle.textContent = name;
    super.openModal();
  }
}
