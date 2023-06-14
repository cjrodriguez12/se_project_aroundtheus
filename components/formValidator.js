class formValidator {
    constructor(settings, formElement){
   
        this._form = formElement;
        this._inputSelector=settings.inputSelector;
        this._submitButtonSelector=settings.submitButtonSelector;
        this._inactiveButtonClass=settings.inactiveButtonClass;
        this._inputErrorClass=settings.inputErrorClass;
        this._errorClass=settings.errorClass;
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
      checkInputValidity(inputEL, settings) {
        if (!inputEL.validity.valid) {
          showInputError(this._form, inputEL, settings);
        } else {
          hideInputError(this._form, inputEL, settings);
        }
      }
    _hasInvalidInput(inputList) {
        return !inputList.every((_inputSelector) => _inputSelector.validity.valid);
    }
    _toggleButtonState() {
        if (hasInvalidInput(inputELs)) {
          this._submitButton.classList.add(this._inactiveButtonClass);
          this._submitButton.disabled = true;
        } else {
          this._submitButton.classList.remove(this._inactiveButtonClass);
          this._submitButton.disabled = false;
        }
      }
    _setEventListeners(){
        this._inputELs = [...this.form.querySelectorAll(this.inputSelector)];
        this._submitButton = this.form.querySelector(this.submitButtonSelector);
        toggleButtonState(this._inputELs, this._submitButton, settings);
        inputELs.forEach((_inputSelector) => {
            this._inputSelector.addEventListener("input", (e) => {
              checkInputValidity(this._form, this._inputSelector, settings);
              toggleButtonState(this._inputELs, this._submitButton, settings);
            });
          });
        }
    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault();
          });
        setEventListeners(this._form, settings);
    }
}

export default formValidator;