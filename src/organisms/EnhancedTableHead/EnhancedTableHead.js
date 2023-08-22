import { TableHead, TableRow, TableSortLabel } from '@mui/material';
import {
  AdditionalHeaderCell,
  AdditionalHeaderCellNarrow,
  StyledHeaderCell,
  StyledHeaderLeftCell,
  StyledSpan,
} from './EnhancedTableHead.styles';

/*
The component below takes care of the Book Table Header, 
allowing for sorting of certain columns.
*/

export const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledHeaderLeftCell
          key="title"
          sortDirection={orderBy === 'title' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'title'}
            direction={orderBy === 'title' ? order : 'asc'}
            onClick={createSortHandler('title')}
          >
            {<b>Title (sorteable)</b>}
            {orderBy === 'title' ? (
              <StyledSpan>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </StyledSpan>
            ) : null}
          </TableSortLabel>
        </StyledHeaderLeftCell>
        <StyledHeaderCell>
          <b>Author</b>
        </StyledHeaderCell>
        <AdditionalHeaderCellNarrow>
          <b>Contributors</b>
        </AdditionalHeaderCellNarrow>
        <AdditionalHeaderCellNarrow
          key="first_publish_year"
          sortDirection={orderBy === 'first_publish_year' ? order : false}
          onClick={createSortHandler('first_publish_year')}
        >
          <TableSortLabel
            active={orderBy === 'first_publish_year'}
            direction={orderBy === 'first_publish_year' ? order : 'asc'}
            onClick={createSortHandler('first_publish_year')}
          >
            {<b>First Publish (sorteable)</b>}
            {orderBy === 'first_publish_year' ? (
              <StyledSpan>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </StyledSpan>
            ) : null}
          </TableSortLabel>
        </AdditionalHeaderCellNarrow>
        <AdditionalHeaderCellNarrow>
          <b>Languages</b>
        </AdditionalHeaderCellNarrow>
        <AdditionalHeaderCellNarrow>
          <b>E-book Access</b>
        </AdditionalHeaderCellNarrow>
        <AdditionalHeaderCell>
          <b>Amazon IDs</b>
        </AdditionalHeaderCell>
        <AdditionalHeaderCell>
          <b>Subjects</b>
        </AdditionalHeaderCell>
        <AdditionalHeaderCell>
          <b>Time</b>
        </AdditionalHeaderCell>
      </TableRow>
    </TableHead>
  );
};
