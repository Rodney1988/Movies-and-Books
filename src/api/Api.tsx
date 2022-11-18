import axios from "axios"
import { BookTitle } from "../types/types"

export const moviesSearch = async (formXMLObj: FormData) => {
    let response = null
    if (formXMLObj) {
        response = await axios({
            method: "post",
            url: "https://i-m-d-b.herokuapp.com/",
            data: formXMLObj,
        })
    }
    return response
}

export const getBooksByTitles = async (title: string) => {
    const titleSpaceReplaced = title.replaceAll(" ", "-")
    const response = await axios.get("http://openlibrary.org/search.json", {
        params: { title: titleSpaceReplaced },
    })
    return response.data as BookTitle
}
