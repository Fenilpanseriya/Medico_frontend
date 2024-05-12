import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Axios } from '../../Axios';
import Header from '../Header';
import Search from "../Home/Search"
import doctor1 from "../../assets/doctor1.png"
import Doctorcard from './Doctorcard';
import { Typography } from '@mui/material';
import DateSlider from './DateSlider';
import AvailableTimeSlots from './AvailableTimeSlots';
import { AuthContext } from '../../AuthProvider';
const DoctorProfile = () => {
    const params=useParams();
    const [doctor,setDoctor]=useState(null)
    const [loading,setLoading]=useState(false);
    const [date,setDate]=useState(new Date(Date.now()).toDateString())
    const [error,setError]=useState(null)
    const { status, login, logout } = useContext(AuthContext);
    console.log(date)

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
    },[params.id])          
  return (
    <div >
    <Header status={status}/>
    <Search/>
    {doctor && <Doctorcard name={doctor.name} photo={doctor1} experience={doctor.experience} fees={doctor.fees} degree={doctor.doctorDegree} address={doctor.doctorAddress}/>
    
    }
    <DateSlider setDate={setDate}/>
    <AvailableTimeSlots id={params.id} date={date} />
    </div>
  )
}

export default DoctorProfile