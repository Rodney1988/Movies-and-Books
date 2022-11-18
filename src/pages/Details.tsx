import styled from "@emotion/styled"
import { Paper, Typography } from "@mui/material"
import { capitalize, last } from "lodash"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { getBooksByTitles, moviesSearch } from "../api/Api"
import { StyledCircularProgress } from "../templates/MoviesField"
import { ImageProps, Movie } from "../types/types"

/*
The component below runs the details page of an object when clicking on books or movies. 
*/

export const Details = () => {
    const { pathname } = useLocation()
    let searchValue = pathname.split("/")[2]
    const detailType = pathname.split("/")[1]
    if (searchValue.includes("%20")) {
        searchValue = searchValue.replaceAll("%20", " ")
    }
    const searchMovies = useQuery(["postMovies", searchValue], () => {
        const formElement = document.querySelector("form")
        const formData = new FormData(formElement || ({} as HTMLFormElement))
        formData.append("q", searchValue)
        return moviesSearch(formData)
    })

    const searchBookTitles = useQuery(["getBookTitles", searchValue], () =>
        getBooksByTitles(searchValue)
    )

    if (
        (detailType === "movies" && searchMovies.isLoading) ||
        (detailType === "books" && searchBookTitles.isLoading)
    ) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <StyledCircularProgress />
            </div>
        )
    }

    if (detailType === "movies") {
        const moviesData = searchMovies.data?.data
        delete moviesData["0"]
        const moviesDataArray: Movie[] = Object.values(moviesData)
        const id = last(pathname.split("/"))
        const ttUrl = "https://www.imdb.com/title/" + id
        const foundMovie = moviesDataArray.find(
            (movie) => ttUrl === movie.tt_url
        )

        return (
            <>
                <StyledDetailTitle variant="h5">
                    Details about the movie '{foundMovie?.title || ""}'
                </StyledDetailTitle>
                <StyledPaperDetails square>
                    <div style={{ padding: "10px" }}>
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
                                {<b>{"Release"}</b>} -{" "}
                                {foundMovie?.release_date.NAME}
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
                                {<b>{"Rating"}</b>} -{" "}
                                {foundMovie?.UserRating.rating}
                            </div>
                        )}
                        {foundMovie?.UserRating && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Rating Description"}</b>} -{" "}
                                {foundMovie?.UserRating.description}
                            </div>
                        )}
                    </div>
                    <StyledDiv src={foundMovie?.small_poster ?? "blue"} />
                </StyledPaperDetails>
            </>
        )
    } else {
        const bookDocsDataArray = searchBookTitles.data?.docs || []
        const id = last(pathname.split("/"))
        const bookKey = "/works/" + id
        const foundDoc = bookDocsDataArray.find(
            (movie) => bookKey === movie.key
        )

        return (
            <>
                <StyledDetailTitle variant="h5">
                    Details about the book '{foundDoc?.title}'
                </StyledDetailTitle>
                <StyledPaperDetails square>
                    <div style={{ padding: "10px" }}>
                        {foundDoc?.title && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Title"}</b>} - {foundDoc?.title}
                            </div>
                        )}
                        {foundDoc?.author_name && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Author(s)"}</b>} -{" "}
                                {foundDoc?.author_name.join(", ")}
                            </div>
                        )}
                        {foundDoc?.contributor && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Contributors"}</b>} -{" "}
                                {foundDoc?.contributor.join(" ")}
                            </div>
                        )}
                        {foundDoc?.first_publish_year && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"First Published"}</b>} -{" "}
                                {foundDoc?.first_publish_year}
                            </div>
                        )}
                        {foundDoc?.first_sentence && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"First Sentences"}</b>} -{" "}
                                {foundDoc?.first_sentence.join(" ")}
                            </div>
                        )}
                        {foundDoc?.ebook_access && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"E-Book Access"}</b>} -{" "}
                                {capitalize(foundDoc?.ebook_access)}
                            </div>
                        )}
                        {foundDoc?.ebook_count_i && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"E-Book Count"}</b>} -{" "}
                                {foundDoc?.ebook_count_i}
                            </div>
                        )}
                        {foundDoc?.edition_count && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Edition Count"}</b>} -{" "}
                                {foundDoc?.edition_count}
                            </div>
                        )}
                        {foundDoc?.language && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Language(s)"}</b>} -{" "}
                                {foundDoc?.language.join(", ")}
                            </div>
                        )}
                        {foundDoc?.subject && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Subject"}</b>} -{" "}
                                {foundDoc?.subject.join(", ")}
                            </div>
                        )}
                        {foundDoc?.id_amazon && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Amazon IDs"}</b>} -{" "}
                                {foundDoc?.id_amazon.join(", ")}
                            </div>
                        )}
                        {foundDoc?.key && (
                            <div style={{ margin: "2px" }}>
                                {<b>{"Key"}</b>} - {foundDoc?.key}
                            </div>
                        )}
                    </div>
                </StyledPaperDetails>
            </>
        )
    }
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
