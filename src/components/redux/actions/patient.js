import { Axios } from "../../../Axios";
import { fetchAppointmentFail, fetchAppointmentRequest, fetchAppointmentSuccess } from "../reducers/patientReducer";

export const fetchAppointments=()=>async(dispatch)=>{
    try {
        dispatch(fetchAppointmentRequest())
        let response=await Axios.get("/total-appointments",{
            withCredentials:true,
        })
        if(response.status===200){
            dispatch(fetchAppointmentSuccess(response.data.appointments))
            // setTotalAppointment(response.data.count);
            // setAllAppointments(response.data.appointments)
        }
    } catch (error) {
        dispatch(fetchAppointmentFail(error.message))
        alert(error.message)
    }
}