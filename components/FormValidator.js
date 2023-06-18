export default 
 class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
  _showInputError(inputEL) {
    const errorMessageEl = this._form.querySelector(`#${inputEL.id}-error`);
    inputEL.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEL.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputError(inputEL) {
    const errorMessageEl = this._form.querySelector(`#${inputEL.id}-error`);
    inputEL.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = " ";
    errorMessageEl.classList.remove(this._errorClass);
  }
  _checkInputValidity(inputEL) {
    if (!inputEL.validity.valid) {
      this._showInputError(inputEL);
    } else {
      this._hideInputError(inputEL);
    }
  }
  _hasInvalidInput() {
    return !this._inputELs.every((_inputSelector) => _inputSelector.validity.valid);
  }
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputELs)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    this._inputELs = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
    this._inputELs.forEach((inputEL) => {
      inputEL.addEventListener("input", (e) => {
        this._checkInputValidity(inputEL);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

