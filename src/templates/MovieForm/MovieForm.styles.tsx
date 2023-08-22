import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const StyledButton = styled(Button)`
  margin-top: 15px;
  background-color: #78ba00;
  :hover {
    background-color: #adba00;
  }
`;

export const StyledInputField = styled(TextField)`
  width: 250px;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const SearchResultsWrapper = styled.div`
  margin: 15px 15px 15px 5px;
`;
