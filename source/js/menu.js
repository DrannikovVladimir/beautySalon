'use strict';

(function () {
  const menu = document.querySelector('.main-nav');
  const toggle = document.querySelector('.main-nav__button');

  toggle.addEventListener('click', evt => {
    evt.preventDefault();
    menu.classList.toggle('main-nav--toggle');
  });
})();
