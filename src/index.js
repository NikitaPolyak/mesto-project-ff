import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, addLikeCard} from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';
// @todo: DOM узлы

const formElement = document.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtonAll = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_new-card');
const nameInput = formElement.querySelector('.popup__input_type_name');
const inputElement = formElement.querySelector('.popup__input');
const jobInput = document.querySelector('.popup__input_type_description');
const title = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');
const openImageCardPopup = document.querySelector('.popup__image');
const imageModal = document.querySelector('.popup_type_image');

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard, addLikeCard, openCard))
});

//Открытие окна редактирования профиля
profileEditButton.addEventListener('click', () => {
  openModal(popupProfileEdit)
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
});

//Открытие окна добавления карточки
addCardButton.addEventListener('click', () => {
  const buttonElement = Array.from(document.querySelectorAll('.popup__button'));
  buttonElement.forEach((elem)=>{
    elem.classList.add('form__submit_inactive');
    elem.disabled = true;
  })
  openModal(popupAddCard);
});

//Закрытие модальных окон при клике на крестик
popupCloseButtonAll.forEach(evt => {
  evt.addEventListener('click', () => {
    const closePopup = evt.closest('.popup');
    closeModal(closePopup);
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = document.querySelector('.popup__button')
    inputList.forEach((inputElement) => {
      hideInputError(formElement,inputElement);
    })
  })});

//Отправка формы и изменение профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const name = nameInput.value;
  const description = jobInput.value;
  title.textContent = name;
  job.textContent = description;
  nameInput.value = '';
  jobInput.value = '';
  closeModal(popupProfileEdit);
};

//Добавление карточки
const handleFormNewCardSubmit = (evt) => {
  evt.preventDefault();
  const newCard = {name:newCardNameInput.value, link:newCardUrlInput.value};
  placesList.prepend(createCard(newCard, deleteCard, addLikeCard, openCard));
  newCardNameInput.value = '';
  newCardUrlInput.value = '';
  closeModal(popupAddCard);
};

//Функция открытия карточки
function openCard(elem){
  openImageCardPopup.src = elem.link;
  openImageCardPopup.alt = elem.name;
  popupCaption.textContent = elem.name;
  openModal(imageModal);
};

formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormNewCardSubmit);


/////////////////////////////////////////////////////////////////////////////////////

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement,inputElement,errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  formError.textContent=errorMessage;
  formError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement,inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement,inputElement) => {

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
    showInputError(formElement,inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement,inputElement);
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

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
  } else {
        // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = Array.from(document.querySelectorAll('.popup__button'));
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      buttonElement.forEach((elem)=> {
        toggleButtonState(inputList, elem);
      })
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();