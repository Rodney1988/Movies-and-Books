import { useQueries } from "../hooks/useQueries"
import CircularProgress from "@mui/material/CircularProgress"
import styled from "@emotion/styled"

export interface UserRating {
    numeric_description_only: number
    description: string
    rating: string
    numeric_rating_only: number
}

export interface ReleaseDate {
    URL: string
    NAME: string
}

export interface Summary {
    "Full Cast": string
    plot: string
}

export interface Movie {
    UserRating: UserRating
    awards: []
    episodes: []
    genres: []
    jsonnob?: undefined
    p_g_rating: string
    poster: string
    release_date: ReleaseDate
    short_imdb_description?: string
    small_poster: string
    sum_mary?: undefined
    summary: Summary
    title?: string
    titleType: string
    trailer: string
    trailer_vid_id: string
    tt_url: string
    upscaled_poster: string
}

export const MoviesField = ({ searchValue }: any) => {
    const [searchMovies] = useQueries(searchValue)
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
        <StyledWrapperDiv>
            {moviesDataArray.map((movie, key) => {
                if (movie.title) {
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
                                        <a href="#/" className="button">
                                            See more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null
            })}
        </StyledWrapperDiv>
    )
}

const StyledCircularProgress = styled(CircularProgress)`
    margin-top: 100px;
`

const StyledWrapperDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 15px 15px 0 15px;
`
type ImageProps = {
    src: string
}
const StyledImageDiv = styled.div<ImageProps>`
    background: linear-gradient(rgb(0 0 0 / 17%), rgba(0, 0, 0, 0.7)),
        url(${(props) =>
                !!props.src
                    ? props.src
                    : "https://media.istockphoto.com/id/540201480/photo/mysterious-unknown-person-in-the-hood-danger-in-darkness.jpg?s=170667a&w=0&k=20&c=SRa6I_Rb_BuTw6vo3OGG6PoSuKJtmaO-CViDjWj-Qkk="})
            center/cover no-repeat;
    height: 525px;
`
