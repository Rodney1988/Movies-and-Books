import { useMemo } from 'react';
import { ByBookTitle, Doc } from '../types/types';

export const useSortedAndSlicedDocsMemoized = (
  data: ByBookTitle | undefined,
  order: any,
  orderBy: any,
  page: number,
  rowsPerPage: number
) => {
  return useMemo(() => {
    if (!data) return [];

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
      const stabilizedThis = array?.map((el: any, index: any) => [el, index]);
      stabilizedThis?.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el: any) => el[0]);
    }

    const sortedDocs = stableSort(data.docs, getComparator(order, orderBy));
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedDocs.slice(start, end);
  }, [data, order, orderBy, page, rowsPerPage]);
};
