import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableCell,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { capitalize, last } from 'lodash';
import { useState } from 'react';

import { Doc } from '../../types/types';
import { pluralize } from '../../helpers/pluralize';
import {
  AdditionalCell,
  AdditionalCellNarrow,
  StyledBodyRow,
  StyledCount,
} from './BooksTable.styles';
import { TablePaginationActions } from '../../organisms/TablePaginationActions/TablePaginationActions';
import { EnhancedTableHead } from '../../organisms/EnhancedTableHead/EnhancedTableHead';
import { useQuery } from 'react-query';
import { getBooksByTitles } from '../../api/Api';
import { formatMultipleValues } from '../../helpers/formatMultipleValues';
import { useSortedAndSlicedDocsMemoized } from '../../hooks/useSortedAndSlicedDocsMemoized';

/*
This component renders a table for the books based on the URL Param searh value.
*/

export const BooksTable = () => {
  // States used for the pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  // States used for sorting
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  // Navigate used to jump to 'Details' component on click
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const searchBooksQuery = searchParams.get('searchBooksQuery') || '';

  const { data, isLoading, isError, error } = useQuery(
    ['moviesQuery', searchBooksQuery],
    () => getBooksByTitles(searchBooksQuery)
  );

  const sortedAndSlicedDocs = useSortedAndSlicedDocsMemoized(
    data,
    order,
    orderBy,
    page,
    rowsPerPage
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

  if (!data) return <></>;

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

  const finalBookData = (
    <>
      <StyledCount>
        {data?.numFound} {pluralize('book', data?.numFound)} found
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
              {sortedAndSlicedDocs.map((row, index) => (
                <StyledBodyRow
                  key={index}
                  onClick={() => {
                    const docKey = last(row.key.split('/'));
                    navigate(`/books/${searchParams}/${docKey}`, {
                      state: { rowData: row as Doc },
                    });
                  }}
                >
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{formatMultipleValues(row.author_name)}</TableCell>
                  <AdditionalCellNarrow>
                    {formatMultipleValues(row.contributor)}
                  </AdditionalCellNarrow>
                  <AdditionalCellNarrow>
                    {row.first_publish_year}
                  </AdditionalCellNarrow>
                  <AdditionalCellNarrow>
                    {formatMultipleValues(row.language)}
                  </AdditionalCellNarrow>
                  <AdditionalCellNarrow>
                    {capitalize(row.ebook_access)}
                  </AdditionalCellNarrow>
                  <AdditionalCell>
                    {formatMultipleValues(row.id_amazon)}
                  </AdditionalCell>
                  <AdditionalCell>
                    {formatMultipleValues(row.subject)}
                  </AdditionalCell>
                  <AdditionalCell>{row.time}</AdditionalCell>
                </StyledBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          colSpan={1}
          count={data ? data.docs.length : 0}
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
    <div>{data?.numFound ? finalBookData : <pre>No book data found</pre>}</div>
  );
};
