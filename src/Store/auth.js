import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {token:'',LoginStatus:false}

const AuthSlice = createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        Login(state,action){
            state.token= action.payload
            state.LoginStatus =true
            localStorage.setItem('Token',state.token)
        }
    }
})

export const Authaction = AuthSlice.actions
export default AuthSlice