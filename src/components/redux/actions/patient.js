import { Axios } from "../../../Axios";
import { fetchAppointmentFail, fetchAppointmentRequest, fetchAppointmentSuccess, fetchReportFail, fetchReportRequest, fetchReportSuccess } from "../reducers/patientReducer";

export const fetchAppointments=()=>async(dispatch)=>{
    try {
        dispatch(fetchAppointmentRequest())
        let response=await Axios.get("/total-appointments",{
            withCredentials:true,
            params:{
                role:localStorage.getItem("role")
            }
        })
        if(response.status===200){
            dispatch(fetchAppointmentSuccess(response.data.appointments))
            console.log(response.data.appointments)
            // setTotalAppointment(response.data.count);
            // setAllAppointments(response.data.appointments)
        }
    } catch (error) {
        dispatch(fetchAppointmentFail(error.message))
        alert(error.message)
    }
}
export const fetchReports=()=>async(dispatch)=>{
    try {
        dispatch(fetchReportRequest())
        let response=await Axios.get("/total-reports",{
            withCredentials:true,
            params:{
                role:localStorage.getItem("role")
            }
        })
        if(response.status===200){
            dispatch(fetchReportSuccess(response.data.reports))
            console.log(response.data.reports)
            
        }
    } catch (error) {
        dispatch(fetchReportFail(error.message))
        alert(error.message)
    }
}

export const addReport=(formData)=>async(dispatch)=>{
    try {
        dispatch(fetchReportRequest())
        let response=await Axios.post("/add-report",formData,{
            withCredentials:true,
            headers:{
              "Content-Type":"multipart/form-data"  
            },
            params:{
                role:localStorage.getItem("role")
            }
        })
        if(response.status===200){
            dispatch(fetchReportSuccess(response.data.reports))
            console.log(response.data.reports)
            
        }
    } catch (error) {
        dispatch(fetchReportFail(error.message))
        alert(error.message)
    }
}