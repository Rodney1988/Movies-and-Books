import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { MoviesField } from "./MoviesField"
export const MovieSearchResults = () => {
    const [searchInputVal, setSearchInputVal] = useState("")
    const [onChangeVal, setOnChangeVal] = useState("")
    const [searchField, setSearchField] = useState(false)

    const handleClick = () => {
        setSearchInputVal(onChangeVal)
        setSearchField(true)
    }
    return (
        <>
            <form>
                <div>
                    <TextField
                        sx={{ width: "200px" }}
                        type="text"
                        placeholder="Search a phrase or name..."
                        name="search"
                        id="searchId"
                        variant="standard"
                        onChange={(e: any) => setOnChangeVal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Button variant="contained" onClick={handleClick}>
                        Search
                    </Button>
                </div>
            </form>
            {searchField && <MoviesField searchValue={searchInputVal} />}
        </>
    )
}
