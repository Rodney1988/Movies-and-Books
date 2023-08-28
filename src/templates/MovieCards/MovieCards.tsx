import { TMDBSearchResult } from '../../types/types';
import { truncate } from 'lodash';
import {
  CardWrapper,
  Content,
  DateSpan,
  Header,
  OverlayDiv,
  SeeMoreButton,
  StyledFieldWrapperDiv,
  SubContent,
  Title,
} from './MovieCards.styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { moviesSearch } from '../../api/Api';
import { CircularProgress } from '@mui/material';

export const MovieCards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchMoviesQuery = searchParams.get('searchMoviesQuery') || '';

  const { data, isLoading, isError, error } = useQuery(
    ['moviesQuery', searchMoviesQuery],
    () => moviesSearch(searchMoviesQuery)
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
    return <pre>Error with fetching the movies query: {issue.message}</pre>;
  }

  if (!data) {
    return <></>;
  }

  return (
    <StyledFieldWrapperDiv>
      {data.map((movie) => {
        if (movie.title && movie.release_date && movie.poster_path) {
          const id = movie.id;
          return (
            <CardWrapper
              key={id}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            >
              <OverlayDiv>
                <Header>
                  <DateSpan className="release-date">
                    {movie.release_date}
                  </DateSpan>
                </Header>
                <Content className="content">
                  <Title>
                    {movie.title
                      ? truncate(movie.title, { length: 45 })
                      : 'This movie has no title...'}
                  </Title>
                  <SubContent className="sub-content">
                    <p className="text">
                      {movie.overview
                        ? truncate(movie.overview, { length: 200 })
                        : 'Unfortunately this movie has no description...'}
                    </p>
                    <SeeMoreButton
                      onClick={() => {
                        navigate(`movies/${searchParams}/${id}`, {
                          state: { singleMovie: movie as TMDBSearchResult },
                        });
                      }}
                    >
                      See more
                    </SeeMoreButton>
                  </SubContent>
                </Content>
              </OverlayDiv>
            </CardWrapper>
          );
        }
        return null;
      })}
    </StyledFieldWrapperDiv>
  );
};
