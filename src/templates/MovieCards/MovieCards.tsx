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

interface MovieCardsProps {
  searchedMovies: TMDBSearchResult[];
  searchValue: string;
}

export const MovieCards: React.FC<MovieCardsProps> = ({
  searchedMovies,
  searchValue,
}) => {
  const fallbackImage =
    'https://media.istockphoto.com/id/540201480/photo/mysterious-unknown-person-in-the-hood-danger-in-darkness.jpg?s=170667a&w=0&k=20&c=SRa6I_Rb_BuTw6vo3OGG6PoSuKJtmaO-CViDjWj-Qkk=';
  return (
    <StyledFieldWrapperDiv>
      {searchedMovies.map((movie) => {
        if (movie.title && movie.release_date) {
          const id = movie.id;
          return (
            <CardWrapper
              key={id}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : ''
              }
              fallBack={fallbackImage}
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
                    <SeeMoreButton to={`movies/${searchValue}/${id}`}>
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
