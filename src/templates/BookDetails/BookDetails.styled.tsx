import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';

export const StyledDetailTitle = styled(Typography)`
  color: #292728;
  margin: 30px 0 0 5px;
`;
export const StyledPaperDetails = styled(Paper)`
  color: #292728;
  margin-top: 15px;
  margin-left: 5px;
  width: 100%;
  max-width: 650px;
  @media only screen and (max-width: 600px) {
    max-width: 250px;
  }
`;
