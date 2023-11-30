import axios from "axios";

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/auth/login`, data)
    return res.data
}

export const createUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/auth/signup`, data)
    return res.data
}

export const getDetailsUser = async (accessToken) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const deleteUser = async (id, accessToken) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getAllUser = async (accessToken) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL_BACKEND}/users/get-all`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/users/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

// export const logoutUser = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/users/log-out`)
//     localStorage.removeItem('accessToken');
//     return res.data
// }


export const updateUser = async ({ accessToken, ...data }) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/users/updateProfile/`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const regiserSeller = async (accessToken) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/users/updateToSeller/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

// export const updateAvatar = async ({ accessToken, ...data }) => {
//     console.log("data in updateUser", Image)
//     const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL_BACKEND}/users/uploadAvatar/`, data, {
//         headers: { Authorization: `Bearer ${accessToken}` }
//     })
//     return res.data
// }
