import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, addLikeCard} from './scripts/card.js';
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
const avatar = document.querySelector('.profile__image');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');
const openImageCardPopup = document.querySelector('.popup__image');
const imageModal = document.querySelector('.popup_type_image');
const popupButtonDel = document.querySelector('.popup__button-del')
const popupDelete = document.querySelector('.popup_delete_card')


// @todo: Вывести карточки на страницу
/*initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard, addLikeCard, openCard))
});*/

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
    elem.classList.add('popup__button_disabled');
    elem.disabled = true;
  })
  openModal(popupAddCard);
});

//Открытие окна подтверждения удаления карточки
function deleteMyCardServer(){
  openImageCardPopup.src = elem.link;
  openImageCardPopup.alt = elem.name;
  popupCaption.textContent = elem.name;
  openModal(imageModal);
};

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

//Загрузка информации о пользователе с сервера
function getInfoUser() {
 fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a'
    }
  })
    .then(res => res.json())
    .then((result) => {
      title.textContent = result.name
      job.textContent = result.about
      avatar.src = result.avatar
      console.log(result);
    });
}
//Загрузка карточек с сервера
function getCardsServer() {
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a'
    }
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      result.forEach(function(element) {
        placesList.append(createCard(element, deleteCard, addLikeCard, openCard))
      });
    });
}

const promises = [getInfoUser(), getCardsServer()]
Promise.all(promises)

//Редактирование профиля на сервере
function updateUserData() {
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  });
}
updateUserData();
//Добавление новой карточки с сервера 
function addNewCard(){
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Камчатка тест',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    })
  });
}
//addNewCard();


//Удаление карточки с сервера 
function deleteCard(cardId) {
  popupDelete.classList.add('popup_is-opened')
  popupDelete.classList.add('popup_is-animated')
  popupButtonDel.addEventListener('click', ()=>{
  fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a'
    }
  /*.then((res)=>res.json())
    .catch((err)=>console.log('Ощибка:',err))*/
  })
  popupDelete.classList.remove('popup_is-opened');
})
}

//Отображение количества лайков карточки и подгон к макету расположено в card__description.css



