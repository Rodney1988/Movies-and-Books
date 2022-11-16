import { useQueries } from "./hooks/useQueries"
import CircularProgress from "@mui/material/CircularProgress"
import styled from "@emotion/styled"

export const MoviesField = ({ searchValue }: any) => {
    const [searchMovies] = useQueries(searchValue)
    if (searchMovies.isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <StyledCircularProgress />
            </div>
        )
    }
    return <>{searchValue}</>
}

const StyledCircularProgress = styled(CircularProgress)`
    margin-top: 100px;
`
