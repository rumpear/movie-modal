// import fetchMovie from './MovieApi';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  backdrop: document.querySelector('[data-modal]'),
  closeBtn: document.querySelector('[data-modal-close]'),
};

const toggleActiveBtn = () => refs.openModalBtn.classList.toggle('btn-is-active');
const toggleBackdrop = () => refs.backdrop.classList.toggle('is-hidden');

const onEscClick = e => {
  if (e.code === 'Escape') {
    toggleActiveBtn();
    toggleBackdrop();
    document.removeEventListener('keydown', onEscClick);
    console.log(1);
  }
};

const openModal = () => {
  toggleActiveBtn();
  toggleBackdrop();
  document.addEventListener('keydown', onEscClick);
};

refs.openModalBtn.addEventListener('click', openModal);

const closeModal = () => {
  toggleActiveBtn();
  toggleBackdrop();
  document.removeEventListener('keydown', onEscClick);
};

refs.closeBtn.addEventListener('click', closeModal);

const onBackdropClick = e => {
  if (e.currentTarget === e.target) {
    closeModal();
  }
};

refs.backdrop.addEventListener('click', onBackdropClick);
