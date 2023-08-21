import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { ImageProps, Movie } from "../types/types"
import React from "react"

/*
This component renders multiple cards (as opposed to a table) 
for the movies based on the 'searchedMovies' prop passed by the parent.
*/

interface MoviesFieldProps {
    searchedMovies: Movie[];
    searchValue: string;
}

export const MoviesField: React.FC<MoviesFieldProps> = ({searchedMovies, searchValue}) => {
    console.log('searchedMovies::::', searchedMovies)
    // return <></>;

    return (
        <StyledFieldWrapperDiv>
            {searchedMovies.map((movie, key) => {
                if (movie["#TITLE"]) {
                    const id = movie["#IMDB_ID"]
                    return (
                        <div className="example-2 card" key={key}>
                            <div className="wrapper">
                                <div className="header">
                                    <StyledImageDiv src={movie["#IMG_POSTER"]}>
                                        <div className="date">
                                            <span className="release-date">
                                                {movie["#YEAR"]}
                                            </span>
                                        </div>
                                    </StyledImageDiv>
                                </div>
                                <div className="data">
                                    <div className="content">
                                        <h1 className="title">
                                            <a href="#/">{movie["#TITLE"]}</a>
                                        </h1>
                                        <p className="text">
                                            {`Ranked ${movie["#RANK"]} on IMDB`}
                                        </p>
                                        <p className="text">
                                            {`Actors: ${movie["#ACTORS"]}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null
            })}
        </StyledFieldWrapperDiv>
    )
}

export const StyledCircularProgress = styled(CircularProgress)`
    margin-top: 100px;
`

export const StyledFieldWrapperDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 15px 15px 0 15px;
`

const StyledImageDiv = styled.div<ImageProps>`
    background: linear-gradient(rgb(0 0 0 / 17%), rgba(0, 0, 0, 0.7)),
        url(${(props) =>
                !!props.src
                    ? props.src
                    : "https://media.istockphoto.com/id/540201480/photo/mysterious-unknown-person-in-the-hood-danger-in-darkness.jpg?s=170667a&w=0&k=20&c=SRa6I_Rb_BuTw6vo3OGG6PoSuKJtmaO-CViDjWj-Qkk="})
            center/cover no-repeat;
    height: 525px;
`
