import { useState } from 'react';
import { BooksTable } from '../BooksTable/BooksTable';
import {
  SearchResultsWrapper,
  StyledButton,
  StyledInputField,
} from './BookForm.styles';
import { getBooksByTitles } from '../../api/Api';
import { CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';

/*
The component below sets up the 'book' search input form and renders cards based on that input.
*/

export const BookForm = ({
  searchIsSelected,
}: {
  searchIsSelected: boolean;
}) => {
  const [finalSearchInputVal, setFinalSearchInputVal] = useState<string>('');
  const [onChangeVal, setOnChangeVal] = useState<string>('');
  const [searchFieldIsActive, setSearchFieldIsActive] =
    useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery(
    ['moviesQuery', finalSearchInputVal],
    () => getBooksByTitles(finalSearchInputVal),
    {
      enabled: searchFieldIsActive, // Only runs the query when searchFieldIsActive is true
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
    return <pre>Error with fetching the books query: {issue.message}</pre>;
  }

  const handleSubmit = () => {
    setFinalSearchInputVal(onChangeVal);
    setSearchFieldIsActive(true);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnChangeVal(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = (event.target as HTMLInputElement).value;
      setOnChangeVal(inputValue);
      setSearchFieldIsActive(true);
      setFinalSearchInputVal(inputValue);
    }
  };

  const valueIsEmpty = onChangeVal === '';

  return (
    <SearchResultsWrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledInputField
            type="text"
            placeholder="Search for a book title..."
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
            type="submit"
            disabled={valueIsEmpty && !searchIsSelected}
          >
            Search
          </StyledButton>
        </div>
      </form>
      {searchFieldIsActive && data && (
        <BooksTable searchedBooks={data} searchValue={finalSearchInputVal} />
      )}
    </SearchResultsWrapper>
  );
};
