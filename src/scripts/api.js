const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '1408693c-201a-41de-afd2-34fb2c62888a',
    'Content-Type': 'application/json'
  }
}
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
  return fetch(`${config.baseUrl}/users/me`, { 
     headers: config.headers
   })
   .then(handleResponse)
 }

 //Загрузка карточек с сервера
function getCardsServer() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
}

//Редактирование профиля на сервере
function updateUserData(name,about) {
   return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
}

//Добавление новой карточки с сервера 
function addNewCard(newCard){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link
    })
  })
  .then(handleResponse)
}

//Добавление like карточки на сервере
function addLikeCardServer(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

//Удаление like карточки на сервере
function removeLikeCardServer(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Удаление карточки с сервера
function deleteCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Обновление аватара пользователя на сервере
function updateAvatarServer(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponse)
}

export {getCardsServer,getInfoUser,handleResponse,updateUserData,addNewCard,addLikeCardServer,removeLikeCardServer,deleteCardServer, updateAvatarServer};