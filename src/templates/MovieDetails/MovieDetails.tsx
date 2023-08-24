import styled from '@emotion/styled';
import { RowNumber, TMDBSearchResult } from '../../types/types';
import {
  StyledCenterChildrenDiv,
  StyledCenterChildrenSection,
} from './MovieDetails.styled';

const Clapperboard = ({ children }: any) => (
  <StyledClapperContainer>
    <StyledClapperPiece />
    {children}
  </StyledClapperContainer>
);

function mapGenres(genresArray: number[]): string[] {
  const newGenresArray = genresArray.map((id) => {
    switch (id) {
      case 28:
        return 'Action';
      case 12:
        return 'Adventure';
      case 16:
        return 'Animation';
      case 35:
        return 'Comedy';
      case 80:
        return 'Crime';
      case 99:
        return 'Documentary';
      case 18:
        return 'Drama';
      case 10751:
        return 'Family';
      case 14:
        return 'Fantasy';
      case 36:
        return 'History';
      case 27:
        return 'Horror';
      case 10402:
        return 'Music';
      case 9648:
        return 'Mistery';
      case 10749:
        return 'Romance';
      case 878:
        return 'SciFi';
      case 10770:
        return 'TV Movie';
      case 53:
        return 'Thriller';
      case 10752:
        return 'War';
      case 37:
        return 'Western';
      default:
        return 'Unknown';
    }
  });
  return newGenresArray;
}

export const MovieDetails = ({
  movieState,
}: {
  movieState: TMDBSearchResult;
}) => {
  const genresArray = mapGenres(movieState.genre_ids);
  return (
    <StyledCenterChildrenDiv>
      <Clapperboard>
        <section style={{ position: 'absolute' }}>
          <StyledTriangle>
            <CircleOne />
            <CircleTwo />
            <CircleThree />
          </StyledTriangle>
        </section>
        <StyledStyledClapperPieceBottom />
        <StyledCenterChildrenSection>
          <StyledGridContainer>
            <CellOneRowOne>
              <StyledCellContainer>
                <h2>{movieState.title}</h2>
                <StyledVerticalDivisor></StyledVerticalDivisor>
              </StyledCellContainer>
            </CellOneRowOne>
            <CellTwoRowOne>
              <StyledCellContainer>
                <pre>{`Release: ${movieState.release_date}`}</pre>
                <pre>{`Original language: ${movieState.original_language.toUpperCase()}`}</pre>
                <pre>{`TMDB Popularity: ${Math.round(
                  movieState.popularity
                )}`}</pre>
                <pre>{`Rating: ${movieState.vote_average} / 10`}</pre>
              </StyledCellContainer>
            </CellTwoRowOne>
            <StyledHr number={2} />
            <CellOneRowTwo>{`Description: ${movieState.overview}`}</CellOneRowTwo>
            <StyledHr number={4} />
            <CellOneRowThree>
              {<pre>Genres: {genresArray.join(', ')}</pre>}
            </CellOneRowThree>
          </StyledGridContainer>
        </StyledCenterChildrenSection>
      </Clapperboard>
    </StyledCenterChildrenDiv>
  );
};

const StyledCellContainer = styled.section`
  margin-left: 15px;
  margin-right: 5px;
`;

const StyledHr = styled.hr<RowNumber>`
  width: 100%;
  grid-row: ${({ number }) => `${number}`};
  grid-column: 1 / 3;
  border: 2px solid white;
  transform: translateY(-2px);
`;

const StyledGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2);
  gap: 0px;
  color: white;
  font-family: monospace;
  width: 85%;
  gap: 0px;
`;

const CellOneRowOne = styled.section`
  position: relative;
  display: flex;
  grid-column: 1 / 2;
  grid-row: 1;
  width: 100%;
  min-height: 100px;
  border: 1px solid blue;
`;

const CellTwoRowOne = styled.section`
  display: flex;
  position: relative;
  grid-column: 2 / 2;
  grid-row: 1;
  width: 100%;
  border: 2px solid yellow;
`;

const CellOneRowTwo = styled.section`
  display: flex;
  grid-column: 1 / 3;
  border: 2px solid red;
`;

const CellOneRowThree = styled.section`
  display: flex;
  grid-column: 1 / 3;
  border: 2px solid pink;
`;

const StyledVerticalDivisor = styled.section`
  position: absolute;
  right: -15px;
  height: 110%;
  top: 0;
  margin: 0 15px 0 15px;
  border: 3px solid white;
  transform: translateY(-2px);
`;

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

  height: 65px;
  width: 100%;
  max-width: 660px;
  position: absolute;
  top: 0;
  border-radius: 15px;
  transform: translateY(-15px);
  transition: transform 0.5s ease-in-out;
  transform-origin: left;
  box-shadow: 0 4px 2px -2px #5a434354;
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
  border-top-right-radius: 15px;
  box-shadow: 0 4px 2px -2px #302b2beb;
`;

const StyledTriangle = styled.section`
  transform: translate(0, -3px);
  position: relative;
  width: 130px;
  height: 98px;
  border-radius: 15px 100% 5px 5px;
  background-color: #372f2e;
  box-shadow: 0 4px 8px black;
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
