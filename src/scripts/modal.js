//Функция открытия модального окна
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('click', closeModalOverlay);
};

//Функция закрытия модального окна
const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('click', closeModalOverlay);
};

//Функция закрытия модального окна при клике на overlay
const closeModalOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    };
  }
//Функция закрытия модальных окон при нажатии на ESC
function closeByEscape(event) {
  if(event.key === 'Escape') {
     closeModal(document.querySelector('.popup_is-opened'));
  }
}

export {openModal, closeModal};
