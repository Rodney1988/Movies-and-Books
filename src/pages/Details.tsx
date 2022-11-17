import styled from "@emotion/styled"
import { Paper, Typography } from "@mui/material"
import { last } from "lodash"
import { useLocation } from "react-router-dom"
import { useQueries } from "../hooks/useQueries"
import { StyledCircularProgress } from "../templates/MoviesField"
import { ImageProps, Movie } from "../types/types"

export const Details = () => {
    const { pathname } = useLocation()
    let searchValue = pathname.split("/")[2]
    if (searchValue.includes("%20")) {
        searchValue = searchValue.replaceAll("%20", " ")
    }
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
    const id = last(pathname.split("/"))
    const ttUrl = "https://www.imdb.com/title/" + id
    const foundMovie = moviesDataArray.find((movie) => ttUrl === movie.tt_url)
    return (
        <>
            <StyledDetailTitle variant="h5">
                Details about the movie '{foundMovie?.title || ""}'
            </StyledDetailTitle>
            <StyledPaperDetails square>
                {foundMovie?.title && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Title"}</b>} - {foundMovie?.title}
                    </div>
                )}
                {foundMovie?.summary && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Plot"}</b>} - {foundMovie?.summary.plot}
                    </div>
                )}
                {foundMovie?.release_date && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Release"}</b>} - {foundMovie?.release_date.NAME}
                    </div>
                )}
                {foundMovie?.titleType && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Type"}</b>} - {foundMovie?.titleType}
                    </div>
                )}
                {foundMovie?.tt_url && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"URL"}</b>} -{" "}
                        {
                            <a target="blank" href={foundMovie?.tt_url}>
                                IMDB Landing Page
                            </a>
                        }
                    </div>
                )}
                {foundMovie?.trailer_vid_id && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Trailer"}</b>} -{" "}
                        {
                            <a
                                target="blank"
                                href={
                                    "https://www.imdb.com/video/imdb/" +
                                    foundMovie?.trailer_vid_id
                                }
                            >
                                IMDB Trailer Video
                            </a>
                        }
                    </div>
                )}
                {foundMovie?.UserRating && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Rating"}</b>} - {foundMovie?.UserRating.rating}
                    </div>
                )}
                {foundMovie?.UserRating && (
                    <div style={{ margin: "2px" }}>
                        {<b>{"Rating Description"}</b>} -{" "}
                        {foundMovie?.UserRating.description}
                    </div>
                )}
                <StyledDiv src={foundMovie?.small_poster ?? "blue"} />
            </StyledPaperDetails>
        </>
    )
}

const StyledDiv = styled.div<ImageProps>`
    background: url(${(props) => props.src}) center/cover no-repeat;
    height: 800px;
    @media only screen and (max-width: 600px) {
        max-height: 450px;
    }
`

const StyledDetailTitle = styled(Typography)`
    color: #292728;
    margin: 30px 0 0 5px;
`
export const StyledPaperDetails = styled(Paper)`
    color: #292728;
    margin-top: 15px;
    margin-left: 5px;
    width: 100%;
    max-width: 650px;
    @media only screen and (max-width: 600px) {
        max-width: 250px;
    }
`
