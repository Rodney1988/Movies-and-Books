import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { moviesSearch } from '../api/Api';
import { MoviesField } from './MoviesField';

/*
The component below sets up the 'movie title' search input and renders a table component based on that input
It is similar to the 'BookSearchResults' component
*/

export const MovieSearchResults = () => {
  const [finalSearchInputVal, setFinalSearchInputVal] = useState('');
  const [onChangeVal, setOnChangeVal] = useState('');
  const [searchFieldIsActive, setSearchFieldIsActive] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ['moviesQuery', finalSearchInputVal],
    () => moviesSearch(finalSearchInputVal),
    {
      enabled: searchFieldIsActive, // Only run the query when searchFieldIsActive is true
    }
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    const issue: Error | null = error as Error;
    return <pre>Error with fetching the movies query: {issue.message}</pre>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFinalSearchInputVal(onChangeVal);
    setSearchFieldIsActive(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnChangeVal(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setFinalSearchInputVal(onChangeVal);
      setSearchFieldIsActive(true);
    }
  };
  const valueIsEmpty = onChangeVal === '';
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
            disabled={valueIsEmpty}
            type="submit"
          >
            Search
          </StyledButton>
        </div>
      </form>
      {searchFieldIsActive && data && (
        <MoviesField searchedMovies={data} searchValue={finalSearchInputVal} />
      )}
    </SearchResultsWrapper>
  );
};

const StyledButton = styled(Button)`
  margin-top: 15px;
  background-color: #78ba00;
  :hover {
    background-color: #adba00;
  }
`;

const StyledInputField = styled(TextField)`
  width: 250px;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const SearchResultsWrapper = styled.div`
  margin: 15px 15px 15px 5px;
`;
