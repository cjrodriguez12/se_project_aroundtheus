import { openModal } from "../utils/utils.js";
const previewImageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector(".modal__image");
const previewImageTitle = previewImageModal.querySelector(".modal__box-image-title");
export default class Card {
  constructor({ name, link, handlePreviewImage }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePreviewImage = handlePreviewImage;
  }
  _setEventListeners() {
    //like btn
    this._cardElement
      .querySelector(".gallery__card-button")
      .addEventListener("click", () => {
        this._handleLike();
      });
    //delete btn
    this._cardElement
      .querySelector(".gallery__card-delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });
    this._cardElement
      .querySelector(".gallery__card-image")
      .addEventListener("click", () => {
        this._handlePreviewImage();
      });
  }

  /**Event Handlers */
  _handleLike() {
    this._cardElement
      .querySelector(".gallery__card-button")
      .classList.toggle("gallery__card-button_active");
  }
  _handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handlePreviewImage() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    previewImageTitle.textContent = modalImage.alt;
    this.openModal();
    
  }

  getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);
    return this._cardElement;
  }
  getView() {
    // get card view
    this._card = this.getTemplate();
    this._card.querySelector(".gallery__card-image").src = this._link;
    this._card.querySelector(".gallery__card-title").textContent = this._name;
    this._card.querySelector(".gallery__card-image").alt =
      "Photo of " + `${this._name}`;
    // set listeners
    this._setEventListeners();
    // return card
    return this._card;
  }
}
