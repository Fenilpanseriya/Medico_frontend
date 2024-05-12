import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    appointments:[],
    loading:false,
    error:null
}

export const patientReducer = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        fetchAppointmentRequest: (state) => {
            state.loading=true
            state.error=null;
        },
        fetchAppointmentSuccess: (state,action) => {
            console.log("action is "+action.payload)
            state.appointments=action.payload
            state.loading=false
            
        },
        fetchAppointmentFail: (state, action) => {
            state.appointments=[]
            state.error=action.payload
            state.loading=false
        },
    },
})

// Action creators are generated for each case reducer function
export const { fetchAppointmentFail,fetchAppointmentRequest,fetchAppointmentSuccess} = patientReducer.actions

export default patientReducer.reducer