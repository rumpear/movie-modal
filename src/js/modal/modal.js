// import fetchMovie from './MovieApi';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  backdrop: document.querySelector('[data-modal]'),
  closeBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('.modal'),

  modalPoster: document.querySelector('.modal__poster'),
  movieContent: document.querySelector('.movie-wrapper'),

  addToWatchBtn: document.querySelector('.watch-btn'),
  addToQueueBtn: document.querySelector('.queue-btn'),
};
console.log(refs.modal);

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
  getMovie();
  // fetchMovie();
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

import axios from 'axios';

const fetchMovie = async () => {
  const BASE_URL = 'https://api.themoviedb.org/3/movie/';
  const API_KEY = '5e25dc89cc9570e2f881766abec20685';
  const movie_id = 120;

  try {
    const response = await axios.get(`${BASE_URL}/${movie_id}?api_key=${API_KEY}&language=en-US`);
    return await response.data;
  } catch (error) {}
};

const getMovie = async () => {
  try {
    const getData = await fetchMovie();
    const { adult, budget, backdrop_path, original_title, overview, genres } = getData;
    console.log(getData);

    createCardMarkup(getData);
    createPosterMarkup(getData);
  } catch (error) {}
};

const createPosterMarkup = ({ poster_path }) => {
  const markup = `
        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie-poster" class="modal__img" />
    `;
  console.log(markup);

  refs.modalPoster.innerHTML = '';
  // refs.movieContent.innerHTML = markup;
  refs.modalPoster.insertAdjacentHTML('afterbegin', markup);
};

const createCardMarkup = ({
  original_title,
  popularity,
  overview,
  vote_average,
  vote_count,
  genres,
}) => {
  const markup = `
      <p class="modal__title">${original_title}</p>
      <table class="modal-table">
        <tr class="modal-table__row">
          <td class="modal-table__title">Vote / Votes</td>
          <td class="modal-table__desc">
            <span class="modal-table__vote">${vote_average}</span> /
            <span class="modal-table__votes">${vote_count}</span>
          </td>
        </tr>
        <tr class="modal-table__row">
          <td class="modal-table__title">Popularity</td>
          <td class="modal-table__desc">${popularity}</td>
        </tr>
        <tr class="modal-table__row">
          <td class="modal-table__title">Original Title</td>
          <td class="modal-table__desc">${original_title}</td>
        </tr>
        <tr class="modal-table__row">
          <td class="modal-table__title">Genre</td>
          <td class="modal-table__desc">${genres.map(genre => ' ' + genre.name)}</td>
        </tr>
      </table>
      <p class="modal__subtitle">About</p>
      <p class="modal__desc">
        ${overview}
      </p>
    `;
  console.log(markup);

  refs.movieContent.innerHTML = '';
  // refs.movieContent.innerHTML = markup;
  refs.movieContent.insertAdjacentHTML('afterbegin', markup);
};


const onAddToWatchBtnClick = () => {
  refs.addToWatchBtn.classList.toggle('btn-is-active');

  if (refs.addToWatchBtn.classList.contains('btn-is-active')) {
    refs.addToWatchBtn.textContent = 'added to watched';
  } else {
    refs.addToWatchBtn.textContent = 'add to watched';
  }
};

refs.addToWatchBtn.addEventListener('click', onAddToWatchBtnClick);

const onAddToQueueBtnClick = () => {
  refs.addToQueueBtn.classList.toggle('btn-is-active');

  if (refs.addToQueueBtn.classList.contains('btn-is-active')) {
    refs.addToQueueBtn.textContent = 'added to queue';
  } else {
    refs.addToQueueBtn.textContent = 'add to queue';
  }
};

refs.addToQueueBtn.addEventListener('click', onAddToQueueBtnClick);
