import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    doctors:[],
    loading:false,
    error:null
}

export const doctorReducer = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
        fetchDoctorRequest: (state) => {
            state.loading=true
            state.error=null;
        },
        fetchDoctorSuccess: (state,action) => {
            console.log("action is "+action.payload)
            state.doctors=action.payload
            state.loading=false
            
        },
        fetchDoctorFail: (state, action) => {
            state.doctors=[]
            state.error=action.payload
            state.loading=false
        },
    },
})

// Action creators are generated for each case reducer function
export const { fetchDoctorFail,fetchDoctorRequest,fetchDoctorSuccess} = doctorReducer.actions

export default doctorReducer.reducer