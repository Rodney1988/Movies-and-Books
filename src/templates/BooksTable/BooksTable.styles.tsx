import styled from '@emotion/styled';
import {
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: 100px;
`;

export const StyledCount = styled(Typography)`
  color: #494947;
  margin: 5px 5px 10px 5px;
`;

export const StyledBodyRow = styled(TableRow)`
  :hover {
    cursor: pointer;
    background-color: rgb(242 236 236 / 78%);
  }
`;

export const AdditionalCell = styled(TableCell)`
  border-right: 0.5px white solid;
  @media only screen and (max-width: 1520px) {
    display: none;
  }
`;

export const AdditionalCellNarrow = styled(TableCell)`
  border-right: 0.5px white solid;
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;
