import axios from "axios"
import { axiosJWT } from "./UserService"

export const addProductToCart = async ({ accessToken, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/cartItems/addCartItem`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getAllProductOnCart = async (accessToken) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/carts/myCart`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const deleteProductOnCart = async ({ userId, sizeItemId, accessToken }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/cart/deletecart/${userId}/${sizeItemId}`, {
        headers: {
            token: `Beare ${accessToken}`
        }
    })
    return res.data
}

export const updateCate = async ({ id, token, ...dataUpdate }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/category/update/${id}`, dataUpdate, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}

