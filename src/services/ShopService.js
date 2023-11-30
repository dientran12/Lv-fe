import axios from "axios";
import { axiosJWT } from "./UserService"

export const registerShop = async ({ accessToken, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/shops/createShop`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getDetailsShop = async ({ id }) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/shops/${id}`)
    return res.data
}
