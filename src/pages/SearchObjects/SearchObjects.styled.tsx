import styled from '@emotion/styled';
import { ExpandableContentProps } from '../../types/types';

// Styled Components
export const StyledIntroContainer = styled.div`
  margin-left: 20px;
  color: #333333;
  width: 70%;
`;

export const StyledFormControlDiv = styled.div`
  margin-left: 20px;
`;

export const StyledExpandableContent = styled.p<ExpandableContentProps>`
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, opacity 0.3s ease-in-out;
  opacity: 0;
  ${({ expanded }) =>
    expanded &&
    `
    max-height: 100px; /* Adjust this value as needed */
    opacity: 1;
  `}
`;
