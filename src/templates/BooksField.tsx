import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getBooksByTitles } from '../api/Api';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  TablePagination,
  Typography,
} from '@mui/material';
import { capitalize, last } from 'lodash';
import { useState } from 'react';
import { TablePaginationActions } from '../api/organisms/TablePaginationActions';
import { EnhancedTableHead } from '../api/organisms/EnhancedTableHead';
import { Doc } from '../types/types';

/*
This component renders a table for the books based on the 'searchValue' prop passed by the parent.
*/

export const BooksField = ({ searchValue }: any) => {
  // States used for the pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  // States used for sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  // Navigate used to jump to 'Details' component on click
  const navigate = useNavigate();

  const searchBookTitles = useQuery(['getBookTitles', searchValue], () =>
    getBooksByTitles(searchValue)
  );
  if (searchBookTitles.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledCircularProgress />
      </div>
    );
  }
  if (searchBookTitles.isError) {
    return (
      <span>
        <i>Error loading Books by title</i>
      </span>
    );
  }

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

  const bookData = searchBookTitles.data;

  const bookDocsArray = searchBookTitles.data?.docs || [];

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
      <StyledCount>{bookData?.numFound} books found</StyledCount>
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
    <StyledTableWrapper>
      {bookData?.numFound ? finalBookData : <pre>No book data found</pre>}
    </StyledTableWrapper>
  );
};

const formatMultipleValues = (valueArray?: string[]) => {
  return valueArray?.map((string, i) => {
    return <div key={string + i}>{string}</div>;
  });
};

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: 100px;
`;
const StyledTableWrapper = styled.div``;

const StyledCount = styled(Typography)`
  color: #494947;
  margin: 5px 5px 10px 5px;
`;

const StyledBodyRow = styled(TableRow)`
  :hover {
    cursor: pointer;
    background-color: rgb(242 236 236 / 78%);
  }
`;

const AdditionalCell = styled(TableCell)`
  border-right: 0.5px white solid;
  @media only screen and (max-width: 1520px) {
    display: none;
  }
`;

const AdditionalCellNarrow = styled(TableCell)`
  border-right: 0.5px white solid;
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
