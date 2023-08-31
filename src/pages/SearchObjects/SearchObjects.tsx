import { useEffect, useState } from 'react';
import { MovieForm } from '../../templates/MovieForm/MovieForm';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { BookForm } from '../../templates/BookForm/BookForm';
import { useSearchParams } from 'react-router-dom';

/*
The component below is just just acts as a fork to split between movies and books depending on the user's 
selected dropdown.
*/

export const SearchObjects = () => {
  const [searchType, setSearchType] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTypeParam = searchParams.get('searchType');

  useEffect(() => {
    setSearchType(searchTypeParam || '');
  }, [searchTypeParam]);

  let formElement;

  if (searchTypeParam === 'movies') {
    formElement = <MovieForm searchType={searchType} />;
  } else if (searchTypeParam === 'books') {
    formElement = <BookForm searchType={searchType} />;
  }

  let intro;

  if (!searchTypeParam) {
    intro = (
      <>
        <h1>Homepage</h1>
        <p>
          I originally built this in app order to have fun styling and handling
          data which coming from different APIs sources (openlibrary and TMDB).
        </p>
        <p>
          This page consists of two pages, the query page and the details page.
          The details page pops up when you select a particular book or movie
          and shows more specific information about the selected book or movie.
        </p>
        <b>
          <p>Select a category below:</p>
        </b>
      </>
    );
  }
  if (searchTypeParam === 'movies') {
    intro = <h3>Search by movies</h3>;
  }
  if (searchTypeParam === 'books') {
    intro = <h3>Search by books</h3>;
  }

  return (
    <>
      <div style={{ marginLeft: '20px', color: '#333333', width: '70%' }}>
        <div style={{ maxWidth: '600px' }}>{intro}</div>
        <FormControl sx={{ width: '200px', marginTop: '15px' }}>
          <InputLabel variant="outlined">Search by...</InputLabel>
          <Select
            value={searchType}
            label="Search by..."
            onChange={(e) => {
              //remove all params
              setSearchType(e.target.value);
              setSearchParams({ searchType: e.target.value });
            }}
          >
            <MenuItem value={'movies'}>Movies</MenuItem>
            <MenuItem value={'books'}>Books</MenuItem>
          </Select>
        </FormControl>
        {formElement}
      </div>
    </>
  );
};
