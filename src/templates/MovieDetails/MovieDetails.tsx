import { TMDBSearchResult } from '../../types/types';
import {
  CircleOne,
  CircleThree,
  CircleTwo,
  StyledBotSection,
  StyledCenterChildrenDiv,
  StyledCenterChildrenSection,
  StyledClapperContainer,
  StyledClapperPiece,
  StyledDescriptionSection,
  StyledHr,
  StyledImageSection,
  StyledInfoSection,
  StyledMainSectionContainer,
  StyledMidSection,
  StyledStyledClapperPieceBottom,
  StyledSubInfoSection,
  StyledTopSection,
  StyledTriangle,
  StyledVideoSection,
} from './MovieDetails.styled';
import { mapGenres } from '../../helpers/mapGenres';
import { CircularProgress } from '@mui/material';
import { singleMovieSearch } from '../../api/Api';
import { useQuery } from 'react-query';
import ReactPlayer from 'react-player/youtube';
import { CustomButton } from '../../atoms/CustomButton/CustomButton';
import { To } from 'react-router-dom';

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
  const movieImgUrl = `https://image.tmdb.org/t/p/original/${movieState.poster_path}`;

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
    <div style={{ marginBottom: '10px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          marginLeft: '15px',
          marginBottom: '70px',
        }}
      >
        <CustomButton content={'Back to Movies'} navigateTo={-1 as To} />
      </div>
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
            {/* {Actual content begins below} */}
            <StyledMainSectionContainer>
              {/* {First Row > StyledTopSection} */}
              <StyledTopSection>
                <StyledInfoSection>
                  <h2>{movieState.title}</h2>
                  <h4>{data.tagline}</h4>
                  <pre>{`Status: ${data.status}`}</pre>
                  <pre>{`Release: ${movieState.release_date.split(', ')}`}</pre>
                  <pre>{`OG language: ${movieState.original_language.toUpperCase()}`}</pre>
                  <pre>{`Rating: ${movieState.vote_average} / 10`}</pre>
                </StyledInfoSection>
                <StyledImageSection src={movieImgUrl} />
              </StyledTopSection>
              <StyledHr />
              {/* {Second Row > StyledMidSection} */}
              <StyledMidSection>
                <StyledSubInfoSection>
                  {
                    <pre style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                      {movieState.adult
                        ? 'Only for adults!'
                        : 'Available for all ages!'}
                    </pre>
                  }
                  {<pre>Genres: {genresArray.join(', ')}</pre>}
                  <pre>{`Butget: $${data.budget.toLocaleString()}`}</pre>
                  <pre>{`Revenue: $${data.revenue.toLocaleString()}`}</pre>
                  <pre className="dynamic">{`TMDB popularity: ${Math.round(
                    movieState.popularity
                  )}*`}</pre>
                  <a
                    href="https://developer.themoviedb.org/docs/popularity-and-trending"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: '15px' }}
                  >
                    How popularity is measured
                  </a>
                </StyledSubInfoSection>
                <StyledVideoSection>
                  {youtubeVideoObj ? (
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${youtubeVideoObj?.key}`}
                      height={150}
                      width={200}
                    />
                  ) : (
                    <pre>No videos available</pre>
                  )}
                </StyledVideoSection>
              </StyledMidSection>
              <StyledHr />
              <StyledBotSection>
                <StyledDescriptionSection>
                  <pre>{movieState.overview}</pre>
                </StyledDescriptionSection>
              </StyledBotSection>
            </StyledMainSectionContainer>
          </StyledCenterChildrenSection>
        </Clapperboard>
      </StyledCenterChildrenDiv>
    </div>
  );
};
