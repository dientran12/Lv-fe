import axios from "axios"
import { axiosJWT } from "./UserService"


export const createSizeItem = async ({ versionId, token, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/sizes/createSize/${versionId}`, data, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}

export const getDetailSizeItem = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/sizes/get-detail/${id}`)
    return res.data
}

export const updateSizeItem = async ({ sizeId, token, ...dataUpdate }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/sizes/${sizeId}`, dataUpdate, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}

export const deleteSizeItem = async ({ id, token }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/sizes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
}
