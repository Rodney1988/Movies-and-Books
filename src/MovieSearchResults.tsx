import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { MoviesField } from "./MoviesField"
import styled from "@emotion/styled"

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
                    <StyledButton variant="contained" onClick={handleClick}>
                        Search
                    </StyledButton>
                </div>
            </form>
            {searchField && <MoviesField searchValue={searchInputVal} />}
        </>
    )
}

const StyledButton = styled(Button)`
    margin-top: 15px;
    background-color: #78ba00;
    :hover {
        background-color: #adba00;
    }
`
