import axios from "axios"
import { BookTitle } from "../types/types"

export const moviesSearch = async (searchValue: string) => {
    const url = `https://search.imdbot.workers.dev/?q=${searchValue}`;
    const response = await axios.get(url);
    return response.data;
}

export const getBooksByTitles = async (title: string) => {
    const titleSpaceReplaced = title.replaceAll(" ", "-")
    const response = await axios.get("http://openlibrary.org/search.json", {
        params: { title: titleSpaceReplaced },
    })
    return response.data as BookTitle
}
