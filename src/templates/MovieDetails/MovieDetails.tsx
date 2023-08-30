import { ImageProps, TMDBSearchResult } from '../../types/types';
import {
  CircleOne,
  CircleThree,
  CircleTwo,
  StyledCenterChildrenDiv,
  StyledCenterChildrenSection,
  StyledClapperContainer,
  StyledClapperPiece,
  StyledHr,
  StyledStyledClapperPieceBottom,
  StyledTriangle,
} from './MovieDetails.styled';
import { mapGenres } from '../../helpers/mapGenres';
import { CircularProgress } from '@mui/material';
import { singleMovieSearch } from '../../api/Api';
import { useQuery } from 'react-query';
import ReactPlayer from 'react-player/youtube';
import { CustomButton } from '../../atoms/CustomButton/CustomButton';
import { To } from 'react-router-dom';
import styled from '@emotion/styled';

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
    <>
      <div style={{ display: 'flex', marginTop: '10px', marginLeft: '15px' }}>
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
                  <pre>{`TMDB Popularity: ${Math.round(
                    movieState.popularity
                  )}`}</pre>
                  <pre>{`Rating: ${movieState.vote_average} / 10`}</pre>
                </StyledInfoSection>
                <StyledImageSection src={movieImgUrl} />
              </StyledTopSection>
              <StyledHr />
              {/* {Second Row > StyledMidSection} */}
              <StyledMidSection>
                <StyledSubInfoSection>
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
    </>
  );
};

export const StyledTopSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0 20px 0;
`;

export const StyledMidSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 5px 0 20px 0;
`;

export const StyledBotSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  // margin: 5px 0 20px 0;
`;

export const StyledMainSectionContainer = styled.section`
  font-family: monospace;
  color: white;
  height: 100%;
  width: 100%;
  pre {
    margin: 2px 0px;
    text-wrap: wrap;
  }
`;
export const StyledInfoSection = styled.section`
  color: white;
  height: 100%;
  max-height: 300px;
  padding-left: 20px;
  overflow: scroll;
  h4 {
    font-style: italic;
  }
`;

export const StyledImageSection = styled.section<ImageProps>`
  border: 2px dashed red;

  width: 40%;
  background-image: ${({ src }) => `url('${src}')`};
  background-size: cover;
  @media only screen and (max-width: 440px) {
    display: none;
  }
`;

export const StyledSubInfoSection = styled.section`
  color: white;
  max-height: 500px;
  padding-left: 20px;
  overflow: scroll;
`;

export const StyledVideoSection = styled.section`
  @media only screen and (max-width: 445px) {
    padding-right: 10px;
  }
  @media only screen and (max-width: 360px) {
    display: none;
  }
`;

export const StyledDescriptionSection = styled.section`
  padding: 20px;
  overflow: scroll;
`;
