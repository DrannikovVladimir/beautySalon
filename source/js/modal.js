'use strict';

const modalCallback = document.querySelector('.modal--callback');
const closeCallback = modalCallback.querySelector('.modal__button-close');
const buttonCallback = document.querySelector('.page-header__callback');
const modalCheckin = document.querySelector('.modal--checkin');
const closeCheckin = modalCheckin.querySelector('.modal__button-close');
const buttonCheckin = Array.from(document.querySelectorAll('.checkin'));

const nameInput = Array.from(document.querySelectorAll('.input-name'));
const phoneInput = Array.from(document.querySelectorAll('.form-modal__input[type=tel]'));

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

phoneInput.forEach((phone) => {
  phone.addEventListener('focus', (evt) => {
    phone.value = '+7 ( ';
  });

  phone.addEventListener('input', (evt) => {
    let currentLetter = phone.value.length;

    if (currentLetter === 8) {
      phone.value += ' ) ';
    }
    if (currentLetter === 14) {
      phone.value += ' - ';
    }
    if (currentLetter === 19) {
      phone.value += ' - ';
    }
  });

  phone.addEventListener('blur', (evt) => {
    const phoneValue = phone.value;

    if (phoneValue.length < 10) {
      phone.value = '';
    }

    if (phone.validity.patternMismatch) {
      phone.setCustomValidity('Номер телефона должен быть в формате +7 ( XXX ) XXX - XX - XX');
    } else {
      phone.setCustomValidity('');
    }
  });
});

nameInput.forEach((name) => {
  name.addEventListener('blur', (evt) => {
    console.log(name);
    if (name.validity.patternMismatch) {
      name.setCustomValidity('Имя может содержать только буквы');
    } else {
      name.setCustomValidity('');
    }
  });
});
