import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, addLikeCard } from './scripts/card.js';
import { openModal, closeModal, closeModalOverlay, openCard } from './scripts/modal.js';
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtonAll = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button')
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAll = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const title = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');

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
addCardButton.addEventListener('click', () => {openModal(popupAddCard)});

//Закрытие модальных окон при клике на крестик
popupCloseButtonAll.forEach(evt => {
  evt.addEventListener('click', () => {
    const closePopup = evt.closest('.popup');
    closeModal(closePopup);
  })});

  //Закрытие модального окна при клике на overlay
  popupAll.forEach((elem) => {elem.addEventListener('click', (evt)=>{closeModalOverlay(evt)})});

//Закрытие модальных окон при нажатии на ESC
document.addEventListener('keydown', (evt) => {
  if(evt.keyCode === 27)
  {
    popupAll.forEach((elem) => {closeModal(elem)})
  }
});

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

formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormNewCardSubmit);