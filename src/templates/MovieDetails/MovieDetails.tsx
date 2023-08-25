import { TMDBSearchResult } from '../../types/types';
import {
  CellOneRowOne,
  CellOneRowThree,
  CellOneRowTwo,
  CellTwoRowOne,
  CellTwoRowTwo,
  CircleOne,
  CircleThree,
  CircleTwo,
  StyledCellContainer,
  StyledCenterChildrenDiv,
  StyledCenterChildrenSection,
  StyledClapperContainer,
  StyledClapperPiece,
  StyledGridContainer,
  StyledHr,
  StyledStyledClapperPieceBottom,
  StyledTriangle,
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
