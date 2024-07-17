
//Функция открытия модального окна
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
};

//Функция закрытия модального окна
const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
};

//Функция закрытия модального окна при клике на overlay
const closeModalOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(evt.currentTarget);
    };
  }

  //Функция открытия карточки
  const openCard = (elem) => {
    const popupCaption = document.querySelector('.popup__caption');
    const openImageCardPopup = document.querySelector('.popup__image');
    const imageModal = document.querySelector('.popup_type_image');
    openImageCardPopup.src = elem.link;
    openImageCardPopup.alt = elem.name;
    popupCaption.textContent = elem.name;
    openModal(imageModal);
    };

export {openModal, closeModal, closeModalOverlay, openCard};
