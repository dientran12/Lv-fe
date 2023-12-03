import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listCate: []
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateCate: (state = initialState, action) => {
            state.listCate = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateCate } = categorySlice.actions

export default categorySlice.reducer
