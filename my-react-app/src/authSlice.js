import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        password: '',
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.username = '';
            state.password = '';
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
