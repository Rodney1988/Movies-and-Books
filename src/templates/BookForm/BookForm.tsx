import { useState } from 'react';
import { BooksTable } from '../BooksTable/BooksTable';
import {
  SearchResultsWrapper,
  StyledButton,
  StyledInputField,
} from './BookForm.styles';
import { useSearchParams } from 'react-router-dom';

/*
The component below sets up the 'book' search input form and renders cards based on that input.
*/

export const BookForm = ({
  searchIsSelected,
}: {
  searchIsSelected: boolean;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [onChangeVal, setOnChangeVal] = useState<string>('');

  const searchQuery = searchParams.get('searchQuery') || '';
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Update URL parameter with search value
    setSearchParams({ searchQuery: onChangeVal });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnChangeVal(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Update URL parameter with search value
      setSearchParams({ searchQuery: onChangeVal });
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
      {!!searchQuery && <BooksTable />}
    </SearchResultsWrapper>
  );
};
