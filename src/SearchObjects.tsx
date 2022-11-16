import { useState } from "react"
import { MovieSearchResults } from "./MovieSearchResults"

export const SearchObjects = () => {
    const [searchType, setSearchType] = useState("movies")
    if (searchType === "movies") {
        return <MovieSearchResults />
    }
    return null
}
