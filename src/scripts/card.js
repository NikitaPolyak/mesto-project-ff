// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (element, deleteCard, addLikeCard, openCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardImage.textContent = element.name;
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeCard = cardElement.querySelector('.card__like-button');
  likeCard.addEventListener('click', ()=> {addLikeCard(likeCard)});
  cardDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', ()=> {openCard(element)});
  return cardElement;
}

//Функция лайка карточки
const addLikeCard = (evt) => {
  evt.classList.toggle('card__like-button_is-active');
};
// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
};

export {createCard, deleteCard, addLikeCard};
