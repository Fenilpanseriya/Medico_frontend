import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    appointments:[],
    loading:false,
    reports:[],
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
        fetchReportRequest:(state)=>{
            state.loading=true
            state.error=null

        },
        fetchReportSuccess:(state,action)=>{
            state.loading=false;
            state.error=null;
            state.reports=action.payload

        },
        fetchReportFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchAppointmentFail,fetchAppointmentRequest,fetchAppointmentSuccess,fetchReportFail,
fetchReportRequest,fetchReportSuccess} = patientReducer.actions

export default patientReducer.reducer