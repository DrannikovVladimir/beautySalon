'use strict';

const modalCallback = document.querySelector('.modal--callback');
const closeCallback = modalCallback.querySelector('.modal__button-close');
const buttonCallback = document.querySelector('.page-header__callback');

const onEscPress = (evt) => {
  if (evt.keyCode === 27) {
    modalClose();
  }
};

const modalOpen = () => {
  modalCallback.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

const modalClose = () => {
  modalCallback.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
};

buttonCallback.addEventListener('click', () => {
  modalOpen();
});

closeCallback.addEventListener('click', () => {
  modalClose();
});
