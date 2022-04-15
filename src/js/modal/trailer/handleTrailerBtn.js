import { fetchMovieTrailer } from '../services/serviceMoviesAPI';
import { fetchSingleMovie } from '../services/serviceMoviesAPI';
export const onTrailerBtnClick = async () => {
  const watchTrailerBtnRef = document.querySelector('.watch-trailer-btn');

  watchTrailerBtnRef.addEventListener('click', async (e) => {
    const movieId = e.target.getAttribute('data-id');
    // console.log(movieId);
    const results = await fetchMovieTrailer(movieId);
    // console.log(results);

    // const officialTrailer = results.find(
    //   (trailer) => trailer.name === 'Official'
    // );

    const officialTrailer = results.find((trailer) =>
      trailer.name.includes('Official')
    );

    if (!officialTrailer) {
      alert(`Sorry, we didn't find the official trailer`);
      return;
    }

    const { key: youtubeKey } = officialTrailer;
    renderTrailer(youtubeKey);

    console.log(youtubeKey);

    // if (!officialTrailer) watchTrailerBtnRef.style.display = 'none';

    console.log(officialTrailer);
    // const { key } = results;
    // const { key } = await fetchMovieTrailer(movieId);
    // console.log(key);
    // console.log(data);

    // const ddd = await fetchSingleMovie(movieId);
    // console.log(key);
  });
};

const renderTrailer = (youtubeKey) => {
  const markup = `
    <iframe
    src="https://www.youtube.com/embed/${youtubeKey}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  `;
  const trailerPlayerRef = document.querySelector('.trailer-player');
  console.log(trailerPlayerRef);
  // trailerPlayerRef.insertAdjacentHTML('afterbegin', markup);
  trailerPlayerRef.innerHTML = markup;

  // const modalRef = document.querySelector('.modal');
  // console.log(modalRef);
  // modalRef.innerHTML = markup;
};
