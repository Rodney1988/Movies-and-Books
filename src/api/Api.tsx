import axios from 'axios';
import { ByBookTitle, SpecificMovie, TMDBSearchResult } from '../types/types';

export const moviesSearch = async (searchValue: string) => {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/search/movie`;
  const params = {
    query: searchValue,
    api_key: API_KEY,
  };
  const response = await axios.get(url, { params });
  return response.data.results as TMDBSearchResult[];
};

export const singleMovieSearch = async (movieId: number) => {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const params = {
    api_key: API_KEY,
    append_to_response: 'videos',
  };
  const response = await axios.get(url, { params });
  return response.data as SpecificMovie;
};

export const getBooksByTitles = async (title: string) => {
  const titleSpaceReplaced = title.replaceAll(' ', '-');
  const response = await axios.get('https://openlibrary.org/search.json', {
    params: { title: titleSpaceReplaced },
  });
  return response.data as ByBookTitle;
};
