import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllCate = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/categories/getAll`)
    return res.data
}

export const getAllProductOnCate = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/category/get-by-category/${id}`)
    return res.data
}

