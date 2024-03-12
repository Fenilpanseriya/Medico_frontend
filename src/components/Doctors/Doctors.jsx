import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import axios from 'axios';
import Doctorcard from './Doctorcard';
import { Alldoctor } from './dummy.js';
import { useParams } from 'react-router';
import { Stack ,Spinner} from '@chakra-ui/react';
const Doctors = ({location="",degree=""}) => {
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("")
    const [doctors,setDoctors]=useState(Alldoctor)
    const params=useParams();
    useEffect(()=>{
        
        setLoading(true);
        setError("");
        
        (async()=>{

            try {
                // const controller=new AbortController()
                // const signal=controller.signal;

                // const response=await axios.get(`/finddoctor/${params.location}/${params.degree}`,{signal});
                // if(response.success){
                //     console.log(response.data);
                //     setDoctors(response.data)
                // }
                if(params.location || params.degree){
                    const locationRegex=`/${params.location}/`
                    const degreeRegex=`/${params.degree}/`
                    const data=Alldoctor.slice()?.filter((doc)=>(degreeRegex.match(doc.degree) && locationRegex.match(doc.location)));
                    console.log(JSON.stringify(data));
                    setDoctors(data);
                }
                
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        
            
        })()
        return ()=>{
            setLoading(false);
        }

    },[params.degree,params.location])

    return (<>
        <Header/>
        {
            loading ? <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        /> :<Stack mt={"2rem"} padding={"1rem"} direction={"column"}>
            {
                doctors?.map((doctor)=>(
                    <Doctorcard key={doctor._id} name={doctor.name} photo={doctor.url.doctor1} degree={doctor.degree} experience={doctor.experience} fees={doctor.fees}/>
                ))
            }
        </Stack>
        }
        <Footer/>

    </>
    
)}

export default Doctors