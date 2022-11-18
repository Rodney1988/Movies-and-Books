import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "@emotion/styled"
import { BooksField } from "./BooksField"

export const BookSearchResults = () => {
    const [finalSearchInputVal, setFinalSearchInputVal] = useState<string>("")
    const [onChangeVal, setOnChangeVal] = useState<string>("")
    const [searchFieldIsActive, setSearchFieldIsActive] =
        useState<boolean>(false)

    const handleClick = () => {
        setFinalSearchInputVal(onChangeVal)
        setSearchFieldIsActive(true)
    }
    const handleChange = (e: any) => {
        setOnChangeVal(e.target.value)
    }
    const handleKeyDown = (e: any) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            return false
        }
    }

    const valueIsEmpty = onChangeVal === ""
    return (
        <SearchResultsWrapper>
            <form>
                <div>
                    <StyledInputField
                        type="text"
                        placeholder="Search for a book title..."
                        name="search"
                        id="searchId"
                        variant="standard"
                        onChange={(e: any) => handleChange(e)}
                        required
                        onKeyDown={(e: any) => handleKeyDown(e)}
                    />
                </div>
                <div>
                    <StyledButton
                        variant="contained"
                        onClick={handleClick}
                        disabled={valueIsEmpty}
                    >
                        Search
                    </StyledButton>
                </div>
            </form>
            {searchFieldIsActive && (
                <BooksField searchValue={finalSearchInputVal} />
            )}
        </SearchResultsWrapper>
    )
}

const StyledButton = styled(Button)`
    margin-top: 15px;
    background-color: #78ba00;
    :hover {
        background-color: #adba00;
    }
`

const StyledInputField = styled(TextField)`
    width: 200px;
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }
`

export const SearchResultsWrapper = styled.div`
    margin: 15px 15px 15px 5px;
`
