export default class Card {
  constructor(
    { name, link, isLiked, _id },
    cardSelector,
    popupSelector,
    handleCardClick,
    handleDelete,
    handleToggleLikes
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._popupSelector = popupSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleToggleLikes = handleToggleLikes;
  }
  _setEventListeners() {
    //like btn
    this._cardElement
      .querySelector(".gallery__card-button")
      .addEventListener("click", () => {
        this._handleToggleLikes(this._id, this._isLiked, this);
        //this._handleLike();
      });
    //delete btn
    this._cardElement
      .querySelector(".gallery__card-delete")
      .addEventListener("click", () => {
        this._handleDelete(this._id, this);
      }); //Image Popup
    this._cardElement
      .querySelector(".gallery__card-image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  /**Event Handlers */
  handleLike() {
    this._cardElement
      .querySelector(".gallery__card-button")
      .classList.toggle("gallery__card-button_active");
  }
  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeButton.classList.add("gallery__card-button_active");
    } else {
      this._likeButton.classList.remove("gallery__card-button_active");
    }
  }
  deleteUI() {
    this._cardElement.remove();
    this._cardElement = null;
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
    this._likeButton = this._card.querySelector(".gallery__card-button");
    this._card.querySelector(".gallery__card-image").src = this._link;
    this._card.querySelector(".gallery__card-title").textContent = this._name;
    this._card.querySelector(".gallery__card-image").alt =
      "Photo of " + `${this._name}`;
    // set listeners
    this._updateLikeStatus();
    this._setEventListeners();
    // return card
    return this._card;
  }
}
