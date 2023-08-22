import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import { ImageProps, TMDBSearchResult } from '../types/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash';

interface MoviesFieldProps {
  searchedMovies: TMDBSearchResult[];
  searchValue: string;
}

const StyledFieldWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 15px 0 15px;
`;

const CardWrapper = styled.div<ImageProps>`
  position: relative;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #fff;
  width: 30%;
  min-width: 300px;
  margin: 10px;
  background: ${({ src, fallBack }) => `url('${src ? src : fallBack}')`};
  height: 525px;
  :hover {
    .sub-content {
      transform: translateY(0px);
    }
  }
`;

const OverlayDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgb(0 0 0 / 17%), rgba(0, 0, 0, 0.7));
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  color: #fff;
  margin-top: 5px;
  font-weight: 400;
`;

const DateSpan = styled.span`
  font-size: large;
  margin-right: 4px;
  margin-left: 8px;
  transform: translateY(5px);
`;

const Content = styled.div`
  padding: 1em;
  border: 5px solid blue;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const SubContent = styled.div`
  border: 1px dotted yellow;
  transform: translateY(200px);
  transition: transform 0.3s ease-in-out;
`;

export const MoviesField: React.FC<MoviesFieldProps> = ({
  searchedMovies,
  searchValue,
}) => {
  console.log('searchedMovies::::', searchedMovies);
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
                <Content>
                  <Title className="title">
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
                    <Link to={`movies/${searchValue}/${id}`} className="button">
                      See more
                    </Link>
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

export const StyledCircularProgress = styled(CircularProgress)`
  margin-top: 100px;
`;
