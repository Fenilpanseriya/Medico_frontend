import { Accordion,Text, AccordionButton,Box, AccordionIcon, AccordionItem, AccordionPanel, Heading, VStack, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointments } from '../redux/actions/patient'

const UserAppointments = () => {

    // const [totalAppointment,setTotalAppointment]=useState(5)
    // const [allAppointments,setAllAppointments]=useState([])
    const {appointments}=useSelector(state=>state.patient)
    // const countTotalAppointments=async()=>{
    //     try {
    //         let response=await Axios.get("/total-appointments",{
    //             withCredentials:true,
    //         })
    //         if(response.status===200){
    //             setTotalAppointment(response.data.count);
    //             setAllAppointments(response.data.appointments)
    //         }
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }
    const dispatch=useDispatch()
    console.log("appointments are "+appointments)
    useEffect(()=>{
        (async()=>{
            dispatch(fetchAppointments())
        })()
        
    },[])

  return (
    <VStack width={"full"} height={"100%"} minHeight={"100vh"} spacing={"2rem"}>
        <Heading children="All Appointments" textAlign={"center"} color={"blue.900"} mt={"8"}/>
        <VStack overflow={"scroll"} height={"100%"} width={"100%"} overflowX={"hidden"} overflowY={"hidden"}>
            <Accordion width={"100%"} allowMultiple allowToggle>
            {
                appointments?.map((appointment,index)=>{
                    return <AccordionItem width={"100%"}>
                    <h2>
                        <AccordionButton _expanded={{ bg: '#1A8EFD', color: 'white' }} width={"100%"} >
                            <Box as="span" flex='1' textAlign='left' width={"100%"}>
                                Appointment {index+1}
                            </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <VStack spacing={"0.25rem"}>
                            <HStack>
                                <Text>Appontment Date :- </Text>
                                <Text>{appointment.__parentArray[index++].appointmentDate}</Text>
                            </HStack>
                            <HStack>
                                <Text>Appontment Time :- </Text>
                                <Text>{appointment.__parentArray[index++].appointmentTime}</Text>
                            </HStack>
                            <HStack>
                                <Text>Doctor Name :- </Text>
                                <Text>{appointment.doctor}</Text>
                            </HStack>
                        </VStack>
                    </AccordionPanel>
                </AccordionItem>
                })   
            }
            </Accordion>
        </VStack>
    </VStack>
  )
}

export default UserAppointments