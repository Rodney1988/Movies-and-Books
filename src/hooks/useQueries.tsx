import { useQuery } from "react-query"
import { moviesSearch } from "../api/Api"

export const useQueries = (searchInput: string) => {
    const searchMovies = useQuery(["postMovies", searchInput], () => {
        const formElement = document.querySelector("form")
        const formData = new FormData(formElement || ({} as HTMLFormElement))
        formData.append("q", searchInput)
        return moviesSearch(formData)
    })

    return [searchMovies]
}
