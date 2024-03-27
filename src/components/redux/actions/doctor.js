import { Axios } from "../../../Axios";
import { fetchDoctorFail, fetchDoctorRequest, fetchDoctorSuccess } from "../reducers/doctorReducer";

export const fetchDoctor=(pathname,params)=>async(dispatch)=>{
    
    try {
        const controller=new AbortController()
        const signal=controller.signal;
        let response;
        if(pathname==="/getAllDoctor"){
            dispatch(fetchDoctorRequest())
            response=await Axios.get(`/getAllDoctors`,{signal,withCredentials:true});
        }
        else{
            response=await Axios.get(`/doctor?location=${params.location}&degree=${params.degree}`,{signal,withCredentials:true});
            
        }
        if(response.status===200){
            dispatch(fetchDoctorSuccess(response.data.doctors))
            console.log(response.data.doctors);
            //setDoctors(response.data.doctors)
        }
        
        // if(params.location || params.degree){
        //     const locationRegex=`/${params.location}/`
        //     const degreeRegex=`/${params.degree}/`
        //     const data1=doctors.slice()?.filter((doc)=>(degreeRegex.match(doc.doctorDegree) && locationRegex.match(doc.doctorAddress)));
        //     console.log(JSON.stringify(data1));
        //     setDoctors(data1);
        // }
        
        
    } catch (error) {
        //setError(error)
        fetchDoctorFail(error)
        alert(error)
    }

}