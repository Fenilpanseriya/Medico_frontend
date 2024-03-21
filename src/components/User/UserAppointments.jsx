import { Accordion, AccordionButton,Box, AccordionIcon, AccordionItem, AccordionPanel, Heading, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios'

const UserAppointments = () => {

    const [totalAppointment,setTotalAppointment]=useState(0)

    const countTotalAppointments=async()=>{
        try {
            let response=await Axios.get("/total-appointments",{
                withCredentials:true,
            })
            if(response.status===200){
                setTotalAppointment(response.data.count);
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(()=>{
        countTotalAppointments();
    },[])

  return (
    <VStack width={"full"} height={"100%"} minHeight={"100vh"} spacing={"2rem"}>
        <Heading children="All Appointments" textAlign={"center"} color={"blue.900"}/>
        <VStack overflow={"scroll"} height={"100%"}>
            <Accordion>
            {
                Array.from({length:totalAppointment})?.map((_,index)=>{
                    return <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }} onClick={alert(1)}>
                            <Box as="span" flex='1' textAlign='left'>
                                Click me to see a different style
                            </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.
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