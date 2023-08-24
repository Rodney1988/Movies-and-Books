import { TMDBSearchResult } from '../../types/types';
import React from 'react';
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
import { useNavigate } from 'react-router-dom';

interface MovieCardsProps {
  searchedMovies: TMDBSearchResult[];
  searchValue: string;
}

export const MovieCards: React.FC<MovieCardsProps> = ({
  searchedMovies,
  searchValue,
}) => {
  const navigate = useNavigate();

  if (searchedMovies.length === 0) {
    return <pre>No movie data found</pre>;
  }
  return (
    <StyledFieldWrapperDiv>
      {searchedMovies.map((movie) => {
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
                        navigate(`movies/${searchValue}/${id}`, {
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
