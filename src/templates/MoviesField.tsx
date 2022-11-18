import CircularProgress from "@mui/material/CircularProgress"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { ImageProps, Movie } from "../types/types"
import { last } from "lodash"
import { useQuery } from "react-query"
import { moviesSearch } from "../api/Api"

export const MoviesField = ({ searchValue }: any) => {
    const searchMovies = useQuery(["postMovies", searchValue], () => {
        const formElement = document.querySelector("form")
        const formData = new FormData(formElement || ({} as HTMLFormElement))
        formData.append("q", searchValue)
        return moviesSearch(formData)
    })
    if (searchMovies.isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <StyledCircularProgress />
            </div>
        )
    }

    const moviesData = searchMovies.data?.data
    delete moviesData["0"]
    const moviesDataArray: Movie[] = Object.values(moviesData)
    return (
        <StyledFieldWrapperDiv>
            {moviesDataArray.map((movie, key) => {
                if (movie.title) {
                    const id = last(movie.tt_url.split("/"))
                    return (
                        <div className="example-2 card" key={key}>
                            <div className="wrapper">
                                <div className="header">
                                    <StyledImageDiv src={movie.small_poster}>
                                        <div className="date">
                                            <span className="release-date">
                                                {movie.release_date.NAME}
                                            </span>
                                        </div>
                                    </StyledImageDiv>
                                </div>
                                <div className="data">
                                    <div className="content">
                                        <h1 className="title">
                                            <a href="#/">{movie.title}</a>
                                        </h1>
                                        <p className="text">
                                            {movie.short_imdb_description}
                                        </p>
                                        <Link
                                            to={`movies/${searchValue}/${id}`}
                                            className="button"
                                        >
                                            See more
                                        </Link>
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
