import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";

export const admin_login = createAsyncThunk(
    'auth/admin_login',
    async (info) => {
        try{
            console.log(info)
        }
        catch(error){
            console.log(error.message)
        }
    }
)

export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        successMessage: '',
        errorMessage:'',
        loader: false,
        userInfo: ''
    },
    reducers:{}
});
export default authReducer.reducer;