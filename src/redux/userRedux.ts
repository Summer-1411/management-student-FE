import {createSlice} from '@reduxjs/toolkit'
import { IUser } from '~/types';

interface IinitialState {
  currentUser?: IUser | null
  isLoading: boolean
  error: boolean

}
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isLoading: false,
        error: false,
    } as IinitialState,
    reducers: {
        loginStart: (state) => {
          state.isLoading = true
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.error = true;
            state.currentUser = null
        },
        logout: (state) => {
            state.isLoading = false;
            state.error = false;
            state.currentUser = null
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer