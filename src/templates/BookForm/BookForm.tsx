import { useState } from 'react';
import { BooksTable } from '../BooksTable/BooksTable';
import {
  SearchResultsWrapper,
  StyledButton,
  StyledInputField,
} from './BookForm.styles';
import { useSearchParams } from 'react-router-dom';

/*
The component below sets up the 'book' search input form and provides BooksTable the particular form query.
*/

export const BookForm = ({ searchType }: { searchType: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [onChangeVal, setOnChangeVal] = useState<string>('');

  const searchBooksQuery = searchParams.get('searchBooksQuery') || '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Update URL parameter with search value
    setSearchParams({ searchType, searchBooksQuery: onChangeVal });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOnChangeVal(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchParams({ searchBooksQuery: onChangeVal });
    }
  };

  const buttonIsDisabled = !!!searchType;
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
            disabled={buttonIsDisabled}
          >
            Search
          </StyledButton>
        </div>
      </form>
      {!!searchBooksQuery && <BooksTable />}
    </SearchResultsWrapper>
  );
};
