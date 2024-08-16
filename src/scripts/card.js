// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
const createCard = (element, deleteCard, addLikeCard, openCard) => {
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
  if(element.owner._id != '843c134335734d707123b1b1')
    cardDelete.classList.add('card__delete-button-remove')
  likeCard.addEventListener('click', ()=> {addLikeCard(likeCard)});
  //КАК ИСПОЛЬЗОВАТЬ ФУНКЦИИ НЕ В ФАЙЛЕ INDEX.JS openModal()
  cardDelete.addEventListener('click', (evt)=>{
      deleteCard(element._id)
      /*Ну у тебя есть запрос на сервер, который удаляет карточку. Это функция, где ты вызываешь fetch. Эта функция вовзращает промис и значит на неё можно подписаться через then
      Вызывая любую функцию, которая возвращает промис, ты можешь написать после вызова .then и это действие будет отрабатывать только после выполнения промиса
        .then(()=>{
          const evtTarget = evt.target.closest('.card')
          evtTarget.remove() 
        })*/
      const evtTarget = evt.target.closest('.card')
      evtTarget.remove()
  })
  cardImage.addEventListener('click', ()=> {openCard(element)});
  return cardElement;
}
//Функция лайка карточки
const addLikeCard = (evt) => {
  evt.classList.toggle('card__like-button_is-active');
};

function addLikeCardServer(){
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/cardId', {
    method: 'PUT',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
    }
  });
}
function removeLikeCardServer(){
  fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/cardId', {
    method: 'DELETE',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
    }
  });
}
export {createCard, addLikeCard};
