import { useState } from "react"
import { MovieSearchResults } from "../templates/MovieSearchResults"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { BookSearchResults } from "../templates/BookSearchResults"

/*
The component below is just just acts as a fork to split between movies and books depending on the user's 
selected dropdown.
*/

export const SearchObjects = () => {
    const [searchType, setSearchType] = useState("")
    return (
        <>
            <FormControl sx={{ margin: "25px 0 0 5px", width: "200px" }}>
                <InputLabel variant="outlined">Search by...</InputLabel>
                <Select
                    value={searchType}
                    label="Search by..."
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <MenuItem value={"movies"}>Movies</MenuItem>
                    <MenuItem value={"books"}>Books</MenuItem>
                </Select>
            </FormControl>
            {searchType === "movies" ? <MovieSearchResults /> : <BookSearchResults />}
        </>
    )
}
