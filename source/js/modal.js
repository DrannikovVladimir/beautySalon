'use strict';

const modalCallback = document.querySelector('.modal--callback');
const closeCallback = modalCallback.querySelector('.modal__button-close');
const buttonCallback = document.querySelector('.page-header__callback');
const modalCheckin = document.querySelector('.modal--checkin');
const closeCheckin = modalCheckin.querySelector('.modal__button-close');
const buttonCheckin = Array.from(document.querySelectorAll('.button--checkin'));

const onEscModalCallbackPress = (evt) => {
  if (evt.keyCode === 27) {
    modalCallbackClose();
  }
};

const onEscModalCheckinPress = (evt) => {
  if (evt.keyCode === 27) {
    modalCheckinClose();
  }
};

const modalCallbackOpen = () => {
  modalCallback.classList.remove('hidden');
  document.addEventListener('keydown', onEscModalCallbackPress);
};

const modalCallbackClose = () => {
  modalCallback.classList.add('hidden');
  document.removeEventListener('keydown', onEscModalCallbackPress);
};

const modalCheckinOpen = () => {
  modalCheckin.classList.remove('hidden');
  document.addEventListener('keydown', onEscModalCheckinPress);
};

const modalCheckinClose = () => {
  modalCheckin.classList.add('hidden');
  document.removeEventListener('keydown', onEscModalCheckinPress);
};

buttonCallback.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalCallbackOpen();
});

closeCallback.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalCallbackClose();
});

buttonCheckin.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalCheckinOpen();
  });

  closeCheckin.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalCheckinClose();
  });
});
