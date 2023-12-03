import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllCate = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/categories/getAll`)
    return res.data
}

export const getAllProductOnCateById = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/categories/byCategory/${id}`)
    return res.data
}

export const getAllProductOnCateByName = async (name) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/categories/byCategory/${name}`)
    return res.data
}
