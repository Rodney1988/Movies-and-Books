import { useState } from 'react';

import { MovieCards } from '../MovieCards/MovieCards';
import {
  SearchResultsWrapper,
  StyledButton,
  StyledInputField,
} from './MovieForm.styles';
import { useSearchParams } from 'react-router-dom';

/*
The component below sets up the 'movie title' search input and renders a list of cards based on that input
*/

export const MovieForm = ({ searchType }: { searchType: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [onChangeVal, setOnChangeVal] = useState('');

  const searchMoviesQuery = searchParams.get('searchMoviesQuery') || '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ searchType, searchMoviesQuery: onChangeVal });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnChangeVal(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchType) {
      event.preventDefault();
      setSearchParams({ searchType, searchMoviesQuery: onChangeVal });
    }
  };
  const buttonIsDisabled = !!!searchType;
  return (
    <SearchResultsWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledInputField
            type="text"
            placeholder="Search a phrase or movie name..."
            name="search"
            id="searchId"
            variant="standard"
            onChange={(e: any) => handleChange(e)}
            required
            onKeyDown={(e: any) => handleKeyDown(e)}
          />
        </div>
        <div>
          <StyledButton
            variant="contained"
            disabled={buttonIsDisabled}
            type="submit"
          >
            Search
          </StyledButton>
        </div>
      </form>
      {!!searchMoviesQuery && <MovieCards />}
    </SearchResultsWrapper>
  );
};
