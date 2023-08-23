import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TMDBSearchResult } from '../../types/types';
import { StyledCenterChildren } from './MovieDetails.styled';

const openAnimation = keyframes`
  25%, 75% {
    transform: translateY(0) rotate(-40deg);
  }
`;

const ClapperContainer = styled.div`
  background-color: #111;
  height: 100%;
  min-height: 500px;
  width: 100%;
  max-width: 650px;
  border-radius: 15px;
  position: relative;
  :hover {
    & > div {
      animation: ${openAnimation} 1s linear;
      animation-iteration-count: 1, infinite;
    }
  }
`;

const ClapperPiece = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );
  height: 70px;
  width: 660px;
  position: absolute;
  top: 0;
  border-radius: 15px;
  transform-origin: left;
`;

const Clapperboard = ({ children }: any) => (
  <ClapperContainer>
    <div style={{}}></div>
    <ClapperPiece />
    {children}
  </ClapperContainer>
);

export const MovieDetails = ({
  movieState,
}: {
  movieState: TMDBSearchResult;
}) => {
  return (
    <StyledCenterChildren>
      <Clapperboard>
        <BottomClapperPiece />
      </Clapperboard>
    </StyledCenterChildren>
  );
};

const BottomClapperPiece = styled.section`
  background: repeating-linear-gradient(
    120deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );
  height: 70px;
  width: 660px;
  border-radius: 15px;
`;
