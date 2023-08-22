import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
  TablePagination,
} from '@mui/material';
import { capitalize, last } from 'lodash';
import { useState } from 'react';

import { ByBookTitle, Doc } from '../../types/types';
import { pluralize } from '../../helpers/pluralize';
import {
  AdditionalCell,
  AdditionalCellNarrow,
  StyledBodyRow,
  StyledCircularProgress,
  StyledCount,
} from './BooksTable.styles';
import { TablePaginationActions } from '../../organisms/TablePaginationActions/TablePaginationActions';
import { EnhancedTableHead } from '../../organisms/EnhancedTableHead/EnhancedTableHead';

/*
This component renders a table for the books based on the 'searchValue' prop passed by the parent.
*/
interface BooksTableProps {
  searchedBooks: ByBookTitle;
  searchValue: string;
}

export const BooksTable: React.FC<BooksTableProps> = ({
  searchedBooks,
  searchValue,
}) => {
  // States used for the pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  // States used for sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  // Navigate used to jump to 'Details' component on click
  const navigate = useNavigate();
  console.log('child searchedbooks', searchedBooks);

  function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: any, orderBy: any) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array: Doc[], comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const bookDocsArray = searchedBooks.docs || [];

  const bookDocsArraySorteable = stableSort(
    bookDocsArray,
    getComparator(order, orderBy)
  ).map((row, index) => {
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <StyledBodyRow
        key={labelId}
        onClick={() => {
          const docKey = last(row.key.split('/'));
          return navigate(`/books/${searchValue}/${docKey}`);
        }}
      >
        <TableCell>{row.title}</TableCell>
        <TableCell>{formatMultipleValues(row.author_name)}</TableCell>
        <AdditionalCellNarrow>
          {formatMultipleValues(row.contributor)}
        </AdditionalCellNarrow>
        <AdditionalCellNarrow>{row.first_publish_year}</AdditionalCellNarrow>
        <AdditionalCellNarrow>
          {formatMultipleValues(row.language)}
        </AdditionalCellNarrow>
        <AdditionalCellNarrow>
          {capitalize(row.ebook_access)}
        </AdditionalCellNarrow>
        <AdditionalCell>{formatMultipleValues(row.id_amazon)}</AdditionalCell>
        <AdditionalCell>{formatMultipleValues(row.subject)}</AdditionalCell>
        <AdditionalCell>{row.time}</AdditionalCell>
      </StyledBodyRow>
    );
  });

  // Slicing logic to avoid too many rows to be rendered at once, the others get paginated
  const slicedDocs = bookDocsArraySorteable.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const finalBookData = (
    <>
      <StyledCount>
        {searchedBooks.numFound} {pluralize('book', searchedBooks.numFound)}{' '}
        found
      </StyledCount>
      <Paper>
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* Here is the where the sliced doc objects might get sliced */}
              {rowsPerPage > 0 && slicedDocs}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          colSpan={1}
          count={bookDocsArray ? bookDocsArray.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </>
  );

  return (
    <div>
      {searchedBooks.numFound ? finalBookData : <pre>No book data found</pre>}
    </div>
  );
};

const formatMultipleValues = (valueArray?: string[]) => {
  return valueArray?.map((string, i) => {
    return <div key={string + i}>{string}</div>;
  });
};
