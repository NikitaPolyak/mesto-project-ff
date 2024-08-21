import './pages/index.css';
import { createCard, addLikeCard, deleteCard} from './scripts/card.js';
import { openModal, closeModal} from './scripts/modal.js';
import { getInfoUser, getCardsServer, updateUserData,addNewCard,updateAvatarServer} from './scripts/api.js';
import { hideInputError, enableValidation, clearValidation} from './scripts/validation.js';
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
const formNewAvatar = document.forms['new-avatar'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardUrlInput = document.querySelector('.popup__input_type_url');
const popupCaption = document.querySelector('.popup__caption');
const openImageCardPopup = document.querySelector('.popup__image');
const imageModal = document.querySelector('.popup_type_image');
const buttonElement = document.querySelectorAll('.popup__button');
const buttonEditProfile = formEditProfile.querySelector('.popup__button');
const buttonNewAvatar = formNewAvatar.querySelector('.popup__button');
const buttonNewCard = formNewCard.querySelector('.popup__button');

const popupAva = document.querySelector('.popup_type_new-avatar');
const inputLinkAva = formNewAvatar.querySelector('.popup_type_link-new-avatar'); 


//Корректная загрузка страницы 
function getInfoUserAndCards(){
  const promises = [getInfoUser(), getCardsServer()]
  return Promise.all(promises)
  .then(([userData, cardsData]) => {
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
  clearValidation(popupProfileEdit,validationConfig)
  nameInput.value = title.textContent;
  jobInput.value = job.textContent;
});

//Отправка формы и изменение профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  updateStatusButton(buttonEditProfile, true)
  updateUserData(nameInput.value, jobInput.value)
  .then((data)=>{
    title.textContent = data.name
    job.textContent = data.about
    closeModal(popupProfileEdit)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(()=>{
    updateStatusButton(buttonEditProfile, false)
  })
};

formEditProfile.addEventListener('submit', handleFormSubmit);

//Открытие окна редактирования аватарки
avatar.addEventListener('click', ()=>{
  openModal(popupAva)
  inputLinkAva.value = ''
  clearValidation(popupAva,validationConfig)
 })

//Функция изменения аватара
const updateAvatar = (evt) => {
  updateStatusButton(buttonNewAvatar, true)
  updateAvatarServer(inputLinkAva.value)
  .then((data)=>{
  console.log(data)
  avatar.style = `background-image: url('${data.avatar}');`
  closeModal(popupAva)
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(()=>{
    updateStatusButton(buttonNewAvatar, false)
  })
}

formNewAvatar.addEventListener('submit', updateAvatar)

//ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
//Открытие окна добавления карточки
addCardButton.addEventListener('click', () => {
  openModal(popupAddCard)
  clearValidation(popupAddCard,validationConfig)
});

//Добавление карточки
const handleFormNewCardSubmit = (evt) => {
  evt.preventDefault();
  updateStatusButton(buttonNewCard, true)
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
  .finally(()=>{
    updateStatusButton(buttonNewCard, false)
  })
};

formNewCard.addEventListener('submit', handleFormNewCardSubmit);

//Функция смены статуса кнопки при загрузке
function updateStatusButton(button,status) {
button.textContent = status ? 'Сохранение...' : 'Сохранить'
}

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

const validationConfig = {
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



