import axios from "axios"
import { BookTitle, TMDBSearchResult } from "../types/types"

export const moviesSearch = async (searchValue: string) => {
    const API_KEY = "486400b9fe15c6806425880827fd6c7f"; 
    const url = `https://api.themoviedb.org/3/search/movie`;
    const params = {
        query: searchValue,
        api_key: API_KEY,
        }
    const response = await axios.get(url, {params})
    return response.data.results as TMDBSearchResult[]
}

export const getBooksByTitles = async (title: string) => {
    const titleSpaceReplaced = title.replaceAll(" ", "-")
    const response = await axios.get("http://openlibrary.org/search.json", {
        params: { title: titleSpaceReplaced },
    })
    return response.data as BookTitle
}
