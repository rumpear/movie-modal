const refs = {
  addToWatchBtn: document.querySelector('.watch-btn'),
  addToQueueBtn: document.querySelector('.queue-btn'),
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
