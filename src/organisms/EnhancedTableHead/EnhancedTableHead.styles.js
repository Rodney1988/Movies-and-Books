import styled from '@emotion/styled';
import { TableCell } from '@mui/material';

export const StyledHeaderLeftCell = styled(TableCell)`
  background-color: rgb(165 153 153 / 60%);
  border-top-left-radius: 2px;
  border-right: 0.5px white solid;
`;

export const StyledHeaderCell = styled(TableCell)`
  background-color: rgb(165 153 153 / 60%);
  border-right: 0.5px white solid;
`;

export const AdditionalHeaderCellNarrow = styled(TableCell)`
  background-color: rgb(165 153 153 / 60%);
  border-right: 0.5px white solid;
  @media only screen and (max-width: 769px) {
    display: none;
  }
`;

export const AdditionalHeaderCell = styled(TableCell)`
  background-color: rgb(165 153 153 / 60%);
  border-right: 0.5px white solid;
  @media only screen and (max-width: 1520px) {
    display: none;
  }
`;

export const StyledSpan = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1;
  margin: -1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 20;
  width: 1;
`;
