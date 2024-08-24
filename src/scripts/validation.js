import { validationConfig } from '../index.js'

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement,inputElement,errorMessage,inputErrorClass,errorClass) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.textContent=errorMessage;
  formError.classList.add(errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement,inputElement,inputErrorClass,errorClass) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement,inputElement,inputErrorClass,errorClass) => {

  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
  else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement,inputElement, inputElement.validationMessage,inputErrorClass,errorClass);
  } else {
    // Если проходит, скроем
    hideInputError(formElement,inputElement,inputErrorClass,errorClass);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

//Удаление дублирования кода
const disableSubmitButton = (button, config) => {
  button.disabled = config;
  button.classList.add(validationConfig.inactiveButtonClass)
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement,inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableSubmitButton(buttonElement,true)
  } else {
    // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement,inputSelector,submitButtonSelector,inactiveButtonClass,inputErrorClass,errorClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = Array.from(document.querySelectorAll(submitButtonSelector));
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement,inputErrorClass,errorClass)
      buttonElement.forEach((elem)=> {
       toggleButtonState(inputList, elem, inactiveButtonClass);
      })
    });
  });
};

const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  //const formList = Array.from(document.querySelectorAll('.popup__form'));
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, validationConfig.inputSelector, validationConfig.submitButtonSelector,validationConfig.inactiveButtonClass,validationConfig.inputErrorClass,validationConfig.errorClass);
  });
};

// очистка ошибок валидации вызовом clearValidation
const clearValidation = (elementForm, validationConfig) => {
  const inputList = Array.from(elementForm.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = elementForm.querySelector(validationConfig.submitButtonSelector)
  inputList.forEach((elem)=>{
   hideInputError(elementForm,elem,validationConfig.inputErrorClass,validationConfig.errorClass)
  })
    disableSubmitButton(buttonElement,true)
 }

 export {enableValidation,clearValidation}