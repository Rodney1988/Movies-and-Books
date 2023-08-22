import { useState } from 'react';
import { BooksTable } from '../BooksTable/BooksTable';
import {
  SearchResultsWrapper,
  StyledButton,
  StyledInputField,
} from './BookForm.styles';

/*
The component below sets up the 'book' search input form and renders cards based on that input.
*/

export const BookForm = () => {
  const [finalSearchInputVal, setFinalSearchInputVal] = useState<string>('');
  const [onChangeVal, setOnChangeVal] = useState<string>('');
  const [searchFieldIsActive, setSearchFieldIsActive] =
    useState<boolean>(false);

  const handleClick = () => {
    setFinalSearchInputVal(onChangeVal);
    setSearchFieldIsActive(true);
  };
  const handleChange = (e: any) => {
    setOnChangeVal(e.target.value);
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  };

  const valueIsEmpty = onChangeVal === '';
  return (
    <SearchResultsWrapper>
      <form>
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
            onClick={handleClick}
            disabled={valueIsEmpty}
          >
            Search
          </StyledButton>
        </div>
      </form>
      {searchFieldIsActive && <BooksTable searchValue={finalSearchInputVal} />}
    </SearchResultsWrapper>
  );
};
