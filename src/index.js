import './pages/index.css';
import { createCard, addLikeCard, deleteCard} from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';
import { handleResponse, getInfoUser, getCardsServer, updateUserData,addNewCard,updateAvatarServer} from './scripts/api.js';
// @todo: DOM узлы

const formElement = document.querySelector('.popup__form');
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtonAll = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_new-card');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const title = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');
const openImageCardPopup = document.querySelector('.popup__image');
const imageModal = document.querySelector('.popup_type_image');
const buttonElement = document.querySelectorAll('.popup__button');

const popupAva = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = document.forms['new-avatar'];
const inputLinkAva = formNewAvatar.querySelector('.popup_type_link-new-avatar'); 


//Корректная загрузка страницы 
function getInfoUserAndCards(){
  const promises = [getInfoUser(), getCardsServer()]
  return Promise.all(promises)
  .then(([userData, cardsData]) => {
    //console.log(userData)
    title.textContent = userData.name
    job.textContent = userData.about
    avatar.style = `background-image: url('${userData.avatar}');`

    cardsData.forEach(function(element) {
      placesList.append(createCard(element, deleteCard, addLikeCard, openCard))
    })
  })
  .catch((err) => {
    console.log(err);
  })
}
getInfoUserAndCards()

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
//Открытие окна редактирования профиля и заполнение полей формы 
profileEditButton.addEventListener('click', () => {
  openModal(popupProfileEdit)
  /*Функция clearValidation*/
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
});

//Отправка формы и изменение профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  /*Функция смены статуса кнопки*/
  updateUserData(nameInput.value, jobInput.value)
  .then((data)=>{
    title.textContent = data.name
    job.textContent = data.about
    //console.log(data)
    closeModal(popupProfileEdit)
  })
  .catch((err) => {
    console.log(err)
  })
};

formEditProfile.addEventListener('submit', handleFormSubmit);

//Открытие окна редактирования аватарки
avatar.addEventListener('click', ()=>{
  openModal(popupAva)
  inputLinkAva.value = ''
  /*Функция clearValidation*/
 })

//Функция изменения аватара
const updateAvatar = (evt) => {
  /*Функция смены статуса кнопки*/
  updateAvatarServer(inputLinkAva.value)
  .then((data)=>{
  avatar.style = `background-image: url('${data.avatar}');`
  closeModal(popupAva)
  })
  .catch((err) => {
    console.log(err)
  })
}

formNewAvatar.addEventListener('submit', updateAvatar)

//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
//Открытие окна добавления карточки
addCardButton.addEventListener('click', () => {
  openModal(popupAddCard)
  buttonElement.forEach((elem)=>{
    elem.classList.add('popup__button_disabled');
    elem.disabled = true;
  })
});

//Добавление карточки
const handleFormNewCardSubmit = (evt) => {
  evt.preventDefault();
  /*Функция смены статуса кнопки*/
  const newCard = {name:newCardNameInput.value, link:newCardUrlInput.value};
  addNewCard(newCard)
  .then((data)=>{
    placesList.prepend(createCard(data, deleteCard, addLikeCard, openCard));
    console.log(data)
    newCardNameInput.value = '';
    newCardUrlInput.value = '';
    closeModal(popupAddCard);
  })
  .catch((err) => {
    console.log(err)
  })
};

formNewCard.addEventListener('submit', handleFormNewCardSubmit);

//Закрытие модальных окон при клике на крестик
popupCloseButtonAll.forEach(evt => {
  evt.addEventListener('click', () => {
    const closePopup = evt.closest('.popup');
    closeModal(closePopup);
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      hideInputError(formElement,inputElement);
    })
  })});

//Открытие карточки
function openCard(elem){
  openImageCardPopup.src = elem.link;
  openImageCardPopup.alt = elem.name;
  popupCaption.textContent = elem.name;
  openModal(imageModal);
};

//////////////////////////////////////////////////////////////////////////////////////////////
//ВАЛИДАЦИЯ ПОЛЕЙ ФОРМЫ
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

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement,inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
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

const enableValidation = (param) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  //const formList = Array.from(document.querySelectorAll('.popup__form'));
  const formList = Array.from(document.querySelectorAll(param.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, param.inputSelector, param.submitButtonSelector,param.inactiveButtonClass,param.inputErrorClass,param.errorClass);
  });
};

// очистка ошибок валидации вызовом clearValidation
const clearValidation = (profileForm, param) => {
}
//Можно убрать пустой обьект
const validationConfig ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
// Вызовем функцию
enableValidation(validationConfig);

//Отображение количества лайков карточки и подгон к макету расположено в card__description.css



