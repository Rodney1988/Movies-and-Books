import { useLocation } from 'react-router-dom';

import { Doc, TMDBSearchResult } from '../../types/types';
import { BookDetails } from '../../templates/BookDetails/BookDetails';
import { MovieDetails } from '../../templates/MovieDetails/MovieDetails';

/*
The component below runs the details page of an object when clicking on books or movies. 
*/

export const Details = () => {
  const location = useLocation();
  const locState = location.state;
  const pathname = location.pathname;
  let searchValue = pathname.split('/')[2];
  const detailType = pathname.split('/')[1];
  if (searchValue.includes('%20')) {
    searchValue = searchValue.replaceAll('%20', ' ');
  }
  const bookRowData = locState?.rowData as Doc;
  const movieData = locState?.singleMovie as TMDBSearchResult;

  console.log('MOVIE DATA', movieData);
  if (detailType === 'books') {
    return <BookDetails rowState={bookRowData} />;
  } else if (detailType === 'movies') {
    return <MovieDetails movieState={movieData} />;
  } else {
    return <></>;
  }
};
