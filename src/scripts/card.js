import { addLikeCardServer,removeLikeCardServer,deleteCardServer } from './api.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (element, currentUserId, deleteCard, addLikeCard, openCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const countLike = cardElement.querySelector('.count__like-card')
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  countLike.textContent = element.likes.length
  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeCard = cardElement.querySelector('.card__like-button');
  if(element.likes.some((like) => like._id == currentUserId))
    likeCard.classList.add('card__like-button_is-active')
  
  if(element.owner._id != currentUserId)
    cardDelete.classList.add('card__delete-button-remove')
  likeCard.addEventListener('click', (evt)=>{addLikeCard(evt,element,countLike)})
  cardDelete.addEventListener('click', (evt)=> {deleteCard(evt,element)})
  cardImage.addEventListener('click', ()=> {openCard(element)});
  return cardElement;
}
//Функция удаления карточки 
const deleteCard = (evt,element) => {
  const cardId = element._id
  deleteCardServer(cardId)
  .then(()=>{
    const evtTarget = evt.target.closest('.card')
    evtTarget.remove()
  })
  .catch((err) => {
    console.log(err);
  })
}

//Функция лайка карточки
const addLikeCard = (evt,element,countLike) => {
  const likeButton = evt.target
  const cardId = element._id
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? removeLikeCardServer : addLikeCardServer;
  likeMethod(cardId) 
    .then((res) => {
      likeButton.classList.toggle('card__like-button_is-active') 
      countLike.textContent = res.likes.length  
    })
    .catch(err => console.log(err));
};

export {createCard,addLikeCard,deleteCard};
