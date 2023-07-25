import { Popup } from ".Popup.js";
export class PopupWithImage extends Popup {
    constructor(popUpSelector) {
        super(popUpSelector);
        this.popUpImage = this._popUpElement.querySelector('modal__image');
        this.popUpTitle = this._popUpElement.querySelector('modal__box-image-title');
    }
    openModal(inputName, inputLink) {
        this.popUpImage.src = inputLink;
        this.popUpTitle.alt = inputName;
        this.popUpTitle.textContent = inputName;
        super.openModal();
    }
}