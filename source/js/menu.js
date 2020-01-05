'use strict';

const mainNav = document.querySelector('.main-nav');
const menu = mainNav.querySelector('.menu');
const buttonMenu = mainNav.querySelector('.page-header__button');

buttonMenu.addEventListener('click', (evt) => {
  if (mainNav.classList.contains('main-nav--close')) {
    mainNav.classList.remove('main-nav--close');
    mainNav.classList.add('main-nav--open');
  } else {
    mainNav.classList.remove('main-nav--open');
    mainNav.classList.add('main-nav--close');
  }
});
