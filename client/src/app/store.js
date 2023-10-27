import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import institutionReducer from '../features/auth/institutionSlice'; 



export const store = configureStore({
    reducer: {
        auth: authReducer,
        institution: institutionReducer, 
    }
})