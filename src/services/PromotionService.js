import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllPromotion = async ({ shopId, token }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/discounts/shop/${shopId}/all`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const getAllProductOnPromotion = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/discounts/getAllProductByDiscount/${id}`)
    return res.data
}

export const createPromotion = async ({ token, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/discounts/createDiscount`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const deletePromotion = async ({ id, token }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/discounts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const addPromotionForProduct = async ({ productId, discountId, token }) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/discounts/activate/${discountId}/${productId}`, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}
