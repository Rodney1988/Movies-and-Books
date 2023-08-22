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
  float: left;
  width: 30%;
  min-width: 300px;
  margin: 10px;
  background: ${({ src, fallBack }) => `url('${src ? src : 'fallBack'}')`};
  height: 525px;
`;

// export const CardOverlay = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   background: linear-gradient(
//     0deg,
//     rgb(34, 35, 38) 9%,
//     rgba(33, 34, 37, 0.5) 42%,
//     rgba(34, 35, 38, 0) 156%
//   );
//   height: 100%;
//   width: 100%;
//   h3,
//   p {
//     color: #ffffff;
//     margin-left: 20px;
//   }

//   p {
//     font-weight: bold;
//   }

//   pre {
//     font-family: 'opensans-bold', sans-serif;
//     font-size: 10px;
//     color: #58a795;
//     margin: 0;
//     margin: 0 0 10px 20px;
//     font-weight: bold;
//   }
//   :hover {
//     opacity: 0.6;
//   }
// `;

const OverlayDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgb(0 0 0 / 17%), rgba(0, 0, 0, 0.7));
`;

const Header = styled.div`
  color: #fff;
`;

const DateSpan = styled.span`
  font-size: large;
  margin-right: 4px;
  margin-left: 8px;
  transform: translateY(5px);
`;

const Content = styled.div`
  position: absolute;
  height: 100%;
  color: #fff;
  padding: 1em;
  border: 5px solid blue;
`;

const Title = styled.h1`
  margin-top: 10px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
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
        if (movie.title) {
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
                <Content>
                  <Header>
                    <DateSpan className="release-date">
                      {movie.release_date}
                    </DateSpan>
                  </Header>
                  <Title className="title">
                    {movie.title
                      ? truncate(movie.title, { length: 60 })
                      : 'This movie has no title...'}
                  </Title>
                  <p className="text">
                    {movie.overview
                      ? truncate(movie.overview, { length: 200 })
                      : 'Unfortunately this movie has no description...'}
                  </p>
                  <Link to={`movies/${searchValue}/${id}`} className="button">
                    See more
                  </Link>
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
