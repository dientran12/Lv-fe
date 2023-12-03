import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllVersions = async ({ productId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/versions/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const createVersion = async ({ productId, accessToken, ...data }) => {
    console.log("c asad", { productId, accessToken, data })
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/versions/createVersion/${productId}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    console.log("Helll res.data", res.data)
    return res.data
}

export const getDetailVersion = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/versions/detail/${id}`)
    return res.data
}

export const updateVersion = async ({ idVersion, accessToken, ...dataUpdate }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/versions/updateVersion/${idVersion}`, dataUpdate, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const deleteVersion = async ({ versionId, accessToken }) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/versions/${versionId}/delete`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}
