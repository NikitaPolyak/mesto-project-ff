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
  likeCard.addEventListener('click', (evt)=>{addLikeCard(evt,element,countLike)})
  cardDelete.addEventListener('click', (evt)=> {
    deleteCard(element._id)
    .then(()=>{
      const evtTarget = evt.target.closest('.card')
      evtTarget.remove()
    })
})
  cardImage.addEventListener('click', ()=> {openCard(element)});
  return cardElement;
}
//Функция лайка карточки
const addLikeCard = (evt,element,countLike) => {
  const likeButton = evt.target
  const cardId = element._id
  if(!likeButton.classList.contains('card__like-button_is-active'))
    {
      addLikeCardServer(cardId)
      .then((res)=>{
        likeButton.classList.add('card__like-button_is-active')
        countLike.textContent = res.likes.length
      })
    }
  else {
    removeLikeCardServer(cardId)
    .then((res)=>{
      likeButton.classList.remove('card__like-button_is-active')
      countLike.textContent = res.likes.length
    })
  }
};
//Функция обработки response
function handleResponse(res){
  if(res.ok){
    //УДАЛИТЬ ТЕСТ
    console.log('Проверка ответа сервера')
    return res.json()
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}
function addLikeCardServer(cardId){
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}
function removeLikeCardServer(cardId){
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}

//Удаление карточки с сервера 
function deleteCard(cardId) {
  //popupDelete.classList.add('popup_is-opened')
  //popupDelete.classList.add('popup_is-animated')
  //popupButtonDel.addEventListener('click', ()=>{
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
  //popupDelete.classList.remove('popup_is-opened');
//})
}

export {createCard,addLikeCard,deleteCard,handleResponse};
