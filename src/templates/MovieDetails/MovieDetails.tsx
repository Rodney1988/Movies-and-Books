import styled from '@emotion/styled';
import { ImageProps, RowNumber, TMDBSearchResult } from '../../types/types';
import {
  StyledCenterChildrenDiv,
  StyledCenterChildrenSection,
} from './MovieDetails.styled';
import { mapGenres } from '../../helpers/mapGenres';
import { CircularProgress } from '@mui/material';
import { singleMovieSearch } from '../../api/Api';
import { useQuery } from 'react-query';
import ReactPlayer from 'react-player/youtube';

const Clapperboard = ({ children }: any) => (
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
  const { data, isLoading, isError, error } = useQuery(
    ['specificMovie', movieState.id],
    () => singleMovieSearch(movieState.id)
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    const issue: Error | null = error as Error;
    return <pre>Error with fetching the books query: {issue.message}</pre>;
  }

  if (!data) {
    return <pre>Something went wrong</pre>;
  }
  const genresArray = mapGenres(movieState.genre_ids);
  const movieUrl = `https://image.tmdb.org/t/p/original/${movieState.poster_path}`;

  let videosAreAvailable = false;
  if (data?.videos?.results?.length > 0) {
    videosAreAvailable = true;
  }
  let youtubeVideoObj;
  if (videosAreAvailable) {
    youtubeVideoObj = data.videos.results.find((video) => {
      return video.site === 'YouTube';
    });
  }
  console.log('youtubeVideoObj', youtubeVideoObj);
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
          {/* {Actual content begins here} */}
          <StyledGridContainer>
            <CellOneRowOne src={movieUrl}></CellOneRowOne>
            <CellTwoRowOne>
              <StyledCellContainer>
                <h2>{movieState.title}</h2>
                <h4>{data.tagline}</h4>
                <pre>{`Status: ${data.status}`}</pre>
                <pre>{`Release: ${movieState.release_date}`}</pre>
                <pre>{`Original language: ${movieState.original_language.toUpperCase()}`}</pre>
                <pre>{`TMDB Popularity: ${Math.round(
                  movieState.popularity
                )}`}</pre>
                <pre>{`Rating: ${movieState.vote_average} / 10`}</pre>
              </StyledCellContainer>
            </CellTwoRowOne>
            <StyledHr number={2} />
            <CellOneRowTwo>
              <StyledCellContainer>
                {
                  <pre>
                    {movieState.adult
                      ? 'Only for adults!'
                      : 'Available for all ages!'}
                  </pre>
                }
                {<pre>Genres: {genresArray.join(', ')}</pre>}
                <pre>{`Butget: $${data.budget.toLocaleString()}`}</pre>
                <pre>{`Revenue: $${data.revenue.toLocaleString()}`}</pre>
              </StyledCellContainer>
            </CellOneRowTwo>
            <CellTwoRowTwo>
              {youtubeVideoObj ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${youtubeVideoObj?.key}`}
                  height={150}
                  width={200}
                />
              ) : (
                <pre>No videos available</pre>
              )}
            </CellTwoRowTwo>
            <StyledHr number={4} />
            <CellOneRowThree>
              <StyledCellContainer>
                {`${movieState.overview}`}
              </StyledCellContainer>
            </CellOneRowThree>
          </StyledGridContainer>
        </StyledCenterChildrenSection>
      </Clapperboard>
    </StyledCenterChildrenDiv>
  );
};

const StyledCellContainer = styled.section`
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 5px;
`;

const StyledHr = styled.hr<RowNumber>`
  width: 100%;
  grid-row: ${({ number }) => number};
  grid-column: 1 / 3;
  border: 3px solid white;
  border-radius: 20px;
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

const CellOneRowOne = styled.section<ImageProps>`
  position: relative;
  display: flex;
  grid-column: 1 / 2;
  grid-row: 1;
  width: 100%;
  min-height: 160px;
  // border: 1px solid blue;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
`;

const CellTwoRowOne = styled.section`
  display: flex;
  position: relative;
  grid-column: 2 / 2;
  grid-row: 1;
  width: 100%;
`;

const CellOneRowTwo = styled.section`
  display: flex;
  grid-column: 1 / 1;
`;

const CellTwoRowTwo = styled.section`
  display: flex;
  grid-column: 2 / 3;
`;

const CellOneRowThree = styled.section`
  display: flex;
  grid-column: 1 / 3;
  :last-child {
    margin-bottom: 20px;
  }
`;

// const StyledVerticalDivisor = styled.section`
//   position: absolute;
//   right: -15px;
//   height: 105%;
//   top: 0;
//   margin: 0 15px 0 15px;
//   border: 4px solid white;
//   border-radius: 20px;
//   transform: translateY(-7px);
// `;

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
