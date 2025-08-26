import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    accessToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        clearUser: (state) => {
            state.userInfo = null;
            state.accessToken = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
