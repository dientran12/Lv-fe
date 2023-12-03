import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    username: '',
    email: '',
    phone: '',
    avatar: '',
    address: '',
    shop_id: null,
    role: "customer",
    id: '',
    accessToken: '',
};

const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username, role, shop_id, name, email, address, accessToken, phone, avatar, id } = action.payload
            state.name = name
            state.username = username
            state.email = email
            state.address = address
            state.phone = phone || ''
            state.id = id
            state.role = role
            state.avatar = avatar
            state.shop_id = shop_id
            state.accessToken = accessToken
        },
        resetUser: (state) => {
            state.name = ''
            state.username = ''
            state.email = ''
            state.phone = ''
            state.id = ''
            state.role = 'customer'
            state.avatar = ''
            state.address = ''
            state.shop_id = ''
            state.accessToken = ''
        },
    },
});

export const { updateUser, resetUser } = userSlide.actions;

export default userSlide.reducer;
