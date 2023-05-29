// teomplate literal ``
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
function showInputError(formEL, inputEL, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEL.validationMessage;
  errorMessageEl.classList.add(errorClass);
}
function hideInputError(formEL, inputEL, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEL.querySelector(`#${inputEL.id}-error`);
  inputEL.classList.remove(inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(errorClass);
}
function checkInputValidity(formEL, inputEL, options) {
  if (!inputEL.validity.valid) {
    showInputError(formEL, inputEL, options);
  } else {
    hideInputError(formEL, inputEL, options);
  }
}
function hasInvalidInput(inputList) {
  return !inputList.every((inputEL) => inputEL.validity.valid);
}
function toggleButtonState(inputELs, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputELs)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}
function setEventListeners(formEL, options) {
  const { inputSelector } = options;
  const inputELs = [...formEL.querySelectorAll(inputSelector)];
  const submitButton = formEL.querySelector(options.submitButtonSelector);
  toggleButtonState(inputELs, submitButton, options);
  inputELs.forEach((inputEL) => {
    inputEL.addEventListener("input", (e) => {
      checkInputValidity(formEL, inputEL, options);
      toggleButtonState(inputELs, submitButton, options);
    });
  });
}
function enableValidation(options) {
  const formELs = [...document.querySelectorAll(options.formSelector)];

  formELs.forEach((formEL) => {
    formEL.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEL, options);
    //loook for inputs
    //loop for validation
    //if !valid
    // validation message
    //add error class
    //display error
    //disable button
    // if valid
    //enable button
    //reset error message
  });
}
enableValidation(config);
