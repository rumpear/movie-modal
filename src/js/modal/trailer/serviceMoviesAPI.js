import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '85f8b312958212858b9ad0c0c9cc6fdf',
};

export const fetchGenres = async (language = 'en-US') => {
  const endpoints = [`genre/movie/list`, `genre/tv/list`];

  const response = await axios.all(
    endpoints.map((endpoint) =>
      axios
        .get(`/${endpoint}`, { params: { language } })
        .catch((e) => console.error(e))
    )
  );

  return response[0].data.genres.concat(response[1].data.genres);
};

export const fetchTrending = async (page = 1, language = 'en-US') =>
  await axios
    .get(`/trending/movie/day`, {
      params: {
        language,
        page,
      },
    })
    .then((res) => ({
      list: res.data.results,
      totalPages: res.data.total_pages,
      totalItems: res.data.total_results,
    }))
    .catch((e) => console.error(e));

export const fetchSearch = async (page = 1, query, language = 'en-US') =>
  await axios
    .get(`/search/movie`, {
      params: {
        language,
        include_adult: false,
        page,
        query,
      },
    })
    .then((res) => ({
      list: res.data.results,
      totalPages: res.data.total_pages,
      totalItems: res.data.total_results,
    }))
    .catch((e) => console.error(e));

export const fetchSingleMovie = async (id, language = 'en-US') =>
  await axios
    .get(`/movie/${id}`, {
      params: { language },
    })
    .then((res) => ({ ...res.data }))
    .catch((e) => console.error(e));

// export const fetchMovieTrailer = async (movieId) => {
//   await axios
//     .get(`/movie/${movieId}/videos`)
//     .then((res) => res.data)
//     .catch((e) => console.error(e));
// };

export const fetchMovieTrailer = async (movieId) => {
  try {
    const res = await axios.get(`/movie/${movieId}/videos`);
    return res.data.results;
  } catch (e) {
    return console.error(e);
  }
};
