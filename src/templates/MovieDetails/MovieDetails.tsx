import { TMDBSearchResult } from '../../types/types';
import {
  Overlay,
  StyledCenterChildren,
  StyledDetailTitle,
  StyledPaperDetails,
} from './MovieDetails.styled';

// /*
// The component below runs the details page of the movie.
// */
export const MovieDetails = ({
  movieState,
}: {
  movieState: TMDBSearchResult;
}) => {
  console.log('downmost!!', movieState);
  return (
    <div>
      <StyledCenterChildren>
        <StyledDetailTitle variant="h5">
          Details about the movie '{movieState.title}'
        </StyledDetailTitle>
      </StyledCenterChildren>
      <StyledCenterChildren>
        <StyledPaperDetails square>
          <div style={{ padding: '10px' }}>
            {movieState.title && (
              <div style={{ margin: '2px' }}>
                {<b>{'Title'}</b>} - {movieState.title}
              </div>
            )}
            {movieState.original_language && (
              <div style={{ margin: '2px' }}>
                {<b>{'Original Language'}</b>} -{' '}
                {movieState.original_language.toUpperCase()}
              </div>
            )}
            {movieState.overview && (
              <div style={{ margin: '2px' }}>
                {<b>{'Plot'}</b>} - {movieState.overview}
              </div>
            )}
            {movieState.release_date && (
              <div style={{ margin: '2px' }}>
                {<b>{'Release'}</b>} - {movieState.release_date}
              </div>
            )}
            {movieState.genre_ids && (
              <div style={{ margin: '2px' }}>
                {<b>{'Genres'}</b>} - {movieState.genre_ids}
              </div>
            )}
            {movieState.popularity && (
              <div style={{ margin: '2px' }}>
                {<b>{'TMDB Popularity'}</b>} - {movieState.popularity}
              </div>
            )}
            {movieState.vote_average && (
              <div style={{ margin: '2px' }}>
                {<b>{'Voting average:'}</b>} - {movieState.vote_average}
              </div>
            )}
            <div style={{ margin: '2px' }}>
              {<b>{'Age recommendation'}</b>} -{' '}
              {movieState.adult ? 'Only for adults' : 'For everyone'}
            </div>
          </div>
        </StyledPaperDetails>
      </StyledCenterChildren>
    </div>
  );
};
