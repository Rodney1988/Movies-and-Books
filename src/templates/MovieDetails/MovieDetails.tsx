import styled from '@emotion/styled';
import { TMDBSearchResult } from '../../types/types';
import { StyledCenterChildren } from './MovieDetails.styled';

const StyledClapperboard = ({ children }: any) => (
  <StyledClapperContainer>
    <StyledClapperPiece />
    {children}
  </StyledClapperContainer>
);

export const MovieDetails = ({
  movieState,
}: {
  movieState: TMDBSearchResult;
}) => {
  return (
    <StyledCenterChildren>
      <StyledClapperboard>
        <section style={{ position: 'absolute' }}>
          <StyledTriangle>
            <CircleOne />
            <CircleTwo />
            <CircleThree />
          </StyledTriangle>
        </section>
        <StyledStyledClapperPieceBottom />
      </StyledClapperboard>
    </StyledCenterChildren>
  );
};

const StyledClapperContainer = styled.div`
  background-color: #111;
  height: 100%;
  min-height: 500px;
  width: 100%;
  max-width: 650px;
  border-radius: 15px;
  position: relative;
  transition: transform 1s ease-in-out;
  :hover {
    & > div {
      transform: rotate(-40deg);
    }
  }
`;

const StyledClapperPiece = styled.div`
  background: repeating-linear-gradient(
    120deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );

  height: 94px;
  width: 100%;
  max-width: 660px;
  position: absolute;
  top: 0;
  border-radius: 15px;
  transition: transform 0.5s ease-in-out;
  transform-origin: left;
`;

const StyledStyledClapperPieceBottom = styled.section`
  background: repeating-linear-gradient(
    45deg,
    #111 0%,
    #111 10%,
    #fff 10%,
    #fff 20%
  );
  height: 94px;
  width: 100%;
  max-width: 660px;
  border-radius: 15px;
`;

const StyledTriangle = styled.section`
  transform: translate(0, -4px);
  position: relative;
  width: 130px;
  height: 98px;
  border-radius: 15px 100% 5px 5px;
  background-color: #372f2e;
`;

const CircleOne = styled.section`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

const CircleTwo = styled.section`
  position: absolute;
  bottom: 6px;
  left: 6px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;

const CircleThree = styled.section`
  position: absolute;
  bottom: 6px;
  right: 10px;
  width: 22px;
  height: 22px;
  border-radius: 99px;
  background: gray;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
`;
