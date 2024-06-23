
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(element, deleteCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDelete = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;
  cardDelete.addEventListener('click', deleteCard);
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  const evtTarget = evt.target.closest('.card');
  evtTarget.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
  placesList.append(createCard(element, deleteCard))
});