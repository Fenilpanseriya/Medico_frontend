import React, { memo, useContext, useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Doctorcard from './Doctorcard';
import doctor1 from "../../assets/doctor1.png"
import { useLocation, useParams } from 'react-router';
import { Stack ,Spinner,Text} from '@chakra-ui/react';
import { Axios } from '../../Axios';
import { AuthContext } from '../../AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctor } from '../redux/actions/doctor';

const Doctors = () => {
    // const [loading,setLoading]=useState(false);
    // const [error,setError]=useState("")
    //const [doctors1,setDoctors]=useState([])
    const {loading,doctors,error}=useSelector(state=>state.doctor);
    console.log(doctors)
    const params=useParams();
    const url=useLocation()
    const dispatch =useDispatch()
    const { status } = useContext(AuthContext);
    //const status=status=localStorage.getItem("status")
    useEffect(()=>{
        
       
        
        (async()=>{
            dispatch(fetchDoctor(url.pathname,params))
            // try {
            //     const controller=new AbortController()
            //     const signal=controller.signal;
            //     let response;
            //     if(url.pathname==="/getAllDoctor"){
            //         response=await Axios.get(`/getAllDoctors`,{signal,withCredentials:true});
            //     }
            //     else{
            //         response=await Axios.get(`/doctor?location=${params.location}&degree=${params.degree}`,{signal,withCredentials:true});
                    
            //     }
            //     if(response.status===200){
            //         console.log(response.data.doctors);
            //         setDoctors(response.data.doctors)
            //     }
                
            //     // if(params.location || params.degree){
            //     //     const locationRegex=`/${params.location}/`
            //     //     const degreeRegex=`/${params.degree}/`
            //     //     const data1=doctors.slice()?.filter((doc)=>(degreeRegex.match(doc.doctorDegree) && locationRegex.match(doc.doctorAddress)));
            //     //     console.log(JSON.stringify(data1));
            //     //     setDoctors(data1);
            //     // }
                
            //     setLoading(false)
            // } catch (error) {
            //     setError(error)
            // }
        
            
        })()
        

    },[params.degree,params.location])

    return (<>
        <Header status={status} />
        {
            loading ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        /> :<Stack mt={"2rem"} padding={"1rem"} direction={"column"}>
            {
                doctors?.length>0 ? doctors?.map((doctor)=>(
                    <Doctorcard key={doctor._id} name={doctor.name} photo={doctor1} degree={doctor.doctorDegree} experience={doctor.experience} fees={doctor.fees}  id={doctor._id}/>
                ))
                :
                <Text fontSize={"2rem"} textAlign={"center"} sx={{opacity:0.7}} color={"#1A365D"}>
                    OOPS!! No Doctors Available for Your Search
                </Text>
            }
        </Stack>
        }
        <Footer/>

    </>
    
)}

export default memo(Doctors)