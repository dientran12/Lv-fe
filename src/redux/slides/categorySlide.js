import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listCate: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateCate: (state = initialState, action) => {
            console.log("action", action);
            state.listCate = action.payload
            // state.name = name
            // state.username = username
            // state.email = email
            // state.phone = phone || ''
            // state.id = id
            // state.role = role
            // state.avatar = avatar
            // state.shop_id = shop_id
            // state.accessToken = accessToken
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateCate } = categorySlice.actions

export default categorySlice.reducer
