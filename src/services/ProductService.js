import axios from "axios"
import { axiosJWT } from "./UserService"


export const createProduct = async ({ accessToken, ...data }) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/products/createProduct`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/getAll`)
    return res.data
}

export const getAllProductForShop = async ({ shopId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/shop/${shopId}/all`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/detail/${id}`)
    console.log('data detial product', res.data)
    return res.data
}

export const getAllVersionOfProduct = async ({ productId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/version/${productId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const updateProduct = async ({ id, accessToken, ...dataUpdate }) => {
    console.log("data update", id, dataUpdate)
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL_BACKEND}/products/updateProduct/${id}`, dataUpdate, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getAllProductForShopOnCate = async ({ cateId, shopId, accessToken }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/products/byCategoryOfShop/${cateId}/${shopId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
}

export const getProductSearch = async ({ search }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/search-have-image/?name=${search}`)
    return res.data
}
export const getAllProductForAd = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-for-admin`)
    console.log('res all product', res.data)
    return res.data
}

export const getAllProductOnPage = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/getProductOnPage`)
    return res.data
}

export const getProductType = async ({ type, page = 1, limit = 6 }) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all/?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-type`, {})
    return res.data
}


export const deleteProduct = async (id, token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL_BACKEND}/product/delete/${id}`, {
        headers: {
            token: `Beare ${token}`
        }
    })
    return res.data
}

export const searchProductName = async ({ search }) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/search-have-image/?filter=name&filter=${search}`)
    return res.data
}

export const getAllProductByOrigin = async (origin) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-by-origin-have-image/?origin=${origin}`)
    return res.data
}
export const getAllProductByType = async (type) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-by-type-have-image/?type=${type}`)
    console.log('res.data', res.data)
    return res.data
}
export const getAllProductByBrand = async (brand) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-by-brand-have-image/?brand=${brand}`)
    return res.data
}

export const getProductHasPromotion = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-in-promotion`)
    return res.data
}

