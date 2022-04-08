const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  backdrop: document.querySelector('[data-modal]'),
  closeBtn: document.querySelector('[data-modal-close]'),
};

const toggleActiveBtn = () => refs.openModalBtn.classList.toggle('btn-is-active');

const onEscClick = e => {
  if (e.code === 'Escape') {
    refs.backdrop.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscClick);
    toggleActiveBtn();
  }
};

const toggleModal = () => {
  refs.backdrop.classList.toggle('is-hidden');
  document.addEventListener('keydown', onEscClick);
  toggleActiveBtn();
};
refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeBtn.addEventListener('click', toggleModal);

const onBackdropClick = e => {
  if (e.currentTarget === e.target) {
    toggleModal();
  }
};
refs.backdrop.addEventListener('click', onBackdropClick);
