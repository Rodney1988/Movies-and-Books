import React from 'react';
import styled from '@emotion/styled';
import { Doc } from '../../types/types';

interface Open {
  isOpen: boolean;
}

export const BookDetails = ({ rowState }: { rowState: Doc }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCoverClick = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    <CenterWrapper>
      <BookWrapper onClick={handleCoverClick}>
        <FrontCoverWrapper onClick={handleCoverClick} isOpen={isOpen}>
          <h2>{rowState.title}</h2>
          <h3>By {rowState.author_name}</h3>
          <BackCoverYellow isOpen={isOpen} />
        </FrontCoverWrapper>
        <ContentWrapper>
          <h3>Hi !!</h3>
        </ContentWrapper>
      </BookWrapper>
    </CenterWrapper>
  );
};

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BookWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 450px;
  min-height: 475px;
  height: 100%;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background: #c7af8a; //paper color
  margin-top: 50px;
  perspective: 1000px;
  color: black;
  :hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    max-width: 250px;
  }
`;

const FrontCoverWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 95%;
  height: 100%;
  left: 20px;
  transform: ${(props) =>
    props.isOpen ? 'rotateY(-170deg)' : 'rotateY(-15deg)'};
  transform-style: preserve-3d;
  transform-origin: left;
  transition: transform 0.6s;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background: green;
  :hover {
    cursor: pointer;
  }
`;

const BackCoverYellow = styled.div<Open>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: yellow;
  transform-style: preserve-3d;
  transform-origin: left;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  transform: translateZ(-1px);
`;

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  font-size: 22px;
  left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
