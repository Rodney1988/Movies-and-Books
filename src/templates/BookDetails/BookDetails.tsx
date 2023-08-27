import React from 'react';
import { Doc } from '../../types/types';
import { pluralize } from '../../helpers/pluralize';
import {
  StyledBackCover,
  StyledBookWrapper,
  StyledCenterWrapper,
  StyledContentWrapper,
  StyledFrontCover,
  StyledFrontStyledContentWrapper,
  StyledInsideWrapper,
} from './BookDetails.styled';
import { useNavigate } from 'react-router-dom';

const leatherDarkLocalUrl = require('../../assets/book_leather_dark.png');

export const BookDetails = ({ rowState }: { rowState: Doc }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCoverClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <StyledCenterWrapper>
        <StyledBookWrapper onClick={handleCoverClick}>
          {/* The left border of the book had to be done in inline styles */}
          <div
            style={{
              position: 'absolute',
              width: '50px', // Must be similar to the left attribute of front cover
              borderTopLeftRadius: '3px',
              borderBottomLeftRadius: '3px',
              bottom: '0',
              top: '0',
              left: '0',
              background: `url("${leatherDarkLocalUrl}")`,
              boxShadow: 'inset 0 0 15px #000000a1',
            }}
          />
          <StyledFrontCover onClick={handleCoverClick} isOpen={isOpen}>
            <StyledFrontStyledContentWrapper>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  margin: '7px',
                  padding: '25px',
                }}
              >
                <h2>{rowState?.title}</h2>
                <h3>By {rowState?.author_name?.join(', ')}</h3>
              </div>
            </StyledFrontStyledContentWrapper>
            <StyledBackCover isOpen={isOpen} />
          </StyledFrontCover>
          <StyledInsideWrapper>
            <StyledContentWrapper>
              <h3>{rowState?.title}</h3>
              <p>
                {rowState?.title} was written by {rowState?.author_name} in{' '}
                {rowState?.publish_date
                  ? rowState?.publish_date.join('-')
                  : 'an unknown time'}
                .
              </p>
              <h5>Fun facts:</h5>
              <p>
                Available {pluralize('language', rowState?.language?.length)}:{' '}
                {rowState?.language?.join(', ')}
                <br />
                {pluralize('Publisher', rowState?.publisher?.length)}:{' '}
                {rowState?.publisher?.join(', ')}
              </p>
            </StyledContentWrapper>
          </StyledInsideWrapper>
        </StyledBookWrapper>
      </StyledCenterWrapper>
    </>
  );
};
