import { useEffect, useState } from 'react';
import { MovieForm } from '../../templates/MovieForm/MovieForm';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { BookForm } from '../../templates/BookForm/BookForm';
import { useSearchParams } from 'react-router-dom';
import {
  StyledIntroContainer,
  StyledExpandableContent,
  StyledFormControlDiv,
} from './SearchObjects.styled';

/*
The component below is just just acts as a fork to split between movies and books depending on the user's 
selected dropdown.
*/

export const SearchObjects = () => {
  const [searchType, setSearchType] = useState('');
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
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
  const moreInfos = (
    <>
      <IconButton
        size="small"
        aria-label="more_info"
        onClick={() => setIsIntroExpanded(!isIntroExpanded)}
      >
        {isIntroExpanded ? (
          <KeyboardDoubleArrowUpIcon />
        ) : (
          <KeyboardDoubleArrowDownIcon />
        )}
      </IconButton>
    </>
  );
  if (!searchTypeParam) {
    intro = (
      <>
        <h1>Homepage</h1>
        <div
          style={{
            display: 'flex',
            paddingRight: '20px',
            alignItems: 'center',
          }}
        >
          <p>
            I originally built this in app order to have fun styling and
            handling data which coming from different APIs sources (openlibrary
            and TMDB).
          </p>
          {moreInfos}
        </div>
        <StyledExpandableContent expanded={isIntroExpanded}>
          This page consists of two pages, the query page and the details page.
          The details page pops up when you select a particular book or movie
          and shows more specific information about the selected book or movie.
        </StyledExpandableContent>
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
      <StyledIntroContainer>
        <div style={{ maxWidth: '600px' }}>{intro}</div>
      </StyledIntroContainer>
      <StyledFormControlDiv>
        <FormControl sx={{ width: '200px', marginTop: '15px' }}>
          <InputLabel variant="outlined">Search by...</InputLabel>
          <Select
            value={searchType}
            label="Search by..."
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchParams({ searchType: e.target.value });
            }}
          >
            <MenuItem value={'movies'}>Movies</MenuItem>
            <MenuItem value={'books'}>Books</MenuItem>
          </Select>
        </FormControl>
      </StyledFormControlDiv>
      {formElement}
    </>
  );
};
