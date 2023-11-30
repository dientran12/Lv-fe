import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllVersions = async ({ productId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/versions/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const createVersion = async ({ productId, accessToken, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/versions/createVersion/${productId}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getDetailVersion = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/version/get-version-by-id/${id}`)
    return res.data
}

export const updateVersion = async ({ idVersion, token, ...dataUpdate }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/version/update/${idVersion}`, dataUpdate, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}

export const deleteVersion = async (id, token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/version/delete/${id}`, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}
