import axios from "axios"

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
