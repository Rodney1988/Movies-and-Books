import { useQueries } from "./hooks/useQueries"
import CircularProgress from "@mui/material/CircularProgress"

export const MoviesField = ({ searchValue }: any) => {
    const [searchMovies] = useQueries(searchValue)
    if (searchMovies.isLoading) return <CircularProgress />
    return <>{searchValue}</>
}
