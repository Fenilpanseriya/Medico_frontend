import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Axios } from '../../Axios';
import Header from '../Header';
import { Search } from '@mui/icons-material';
import doctor1 from "../../assets/doctor1.png"
import Doctorcard from './Doctorcard';
const DoctorProfile = () => {
    const params=useParams();
    const [doctor,setDoctor]=useState(null)
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null)
    useEffect(()=>{
        setLoading(true);
        setError(null);
        (async()=>{
            try {
                const response=await Axios.get(`/doctor/profile/${params.id}`)
                if(response.status===200){
                    console.log(response.data.doctor);
                    setDoctor(response.data.doctor);
                }
            } catch (error) {
                setError(error)
            }
            
        })()
        return ()=>{
            setLoading(false)
        }
    },[params])          
  return (
    <>
    <Header/>
    <Search/>
    {doctor && <Doctorcard name={doctor.name} photo={doctor1} experience={doctor.experience} fees={doctor.fees} degree={doctor.doctorDegree} address={doctor.doctorAddress}/>}
    </>
  )
}

export default DoctorProfile