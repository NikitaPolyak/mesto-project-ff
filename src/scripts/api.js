//Функция обработки response
function handleResponse(res){
  if(res.ok){
    return res.json()
  }
  else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

//Загрузка информации о пользователе с сервера
function getInfoUser() {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
     headers: {
       authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
       'Content-Type': 'application/json'
     }
   })
   .then(handleResponse)
 }

 //Загрузка карточек с сервера
function getCardsServer() {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}

//Редактирование профиля на сервере
function updateUserData(name,about) {
   return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
}

//Добавление новой карточки с сервера 
function addNewCard(newCard){
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards', {
    method: 'POST',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
  .then(handleResponse)
}

//Добавление like карточки на сервере
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

//Удаление like карточки на сервере
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
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    }
  })
  .then(handleResponse)
}

//Обновление аватара пользователя на сервере
function updateAvatarServer(link) {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponse)
}

export {getCardsServer,getInfoUser,handleResponse,updateUserData,addNewCard,addLikeCardServer,removeLikeCardServer,deleteCard, updateAvatarServer};