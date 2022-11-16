import { useState } from "react"
import { MovieSearchResults } from "./MovieSearchResults"

export const SearchObjects = () => {
    const [searchType] = useState("movies")
    if (searchType === "movies") {
        return <MovieSearchResults />
    }
    return null
}
