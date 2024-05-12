import React ,{useState,useRef, useEffect}from "react";
import { morningTime, aftrenoonTime, eveningTime } from "../Home/constant";
import { FaCloudSun } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { FaCloudMoon } from "react-icons/fa6";
import { Box, HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import TimeSlots from "./TimeSlots";
import AppointmentModal from "./AppointmentModal";
import axios from "axios";
import { Axios } from "../../Axios";

const AvailableTimeSlots = ({id,date=new Date(Date.now()).toDateString()}) => {

    const { isOpen, onOpen, onClose }=useDisclosure();
    const [openModal,setOpenModal]=useState(false);
    const [time,setTime]=useState("")
    
    const checkAvailability=async()=>{
        let checkAvailabelOrNot=await Axios.get(`/checkslot`,{
            withCredentials:true,
            params:{
                time:time,
                date:date,
                id:id
            }
        })
        if(checkAvailabelOrNot.data.availabel){
            setOpenModal(true)
            onOpen()
        }
        else{
            alert("not available.please select othen slot")
        }
    }

    const handleClick=async(e)=>{
        setTime(e.target.id)
        
    }
    useEffect(()=>{
        checkAvailability();
    },[time])
        
  return (
    <Stack margin={"0 auto"} mt={"2rem"}  p={"1rem 0"} spacing={"1rem"} maxWidth={"1250px"} justifyContent={"center"} >
        <Stack flexWrap={"wrap"} spacing={"0.75rem"} p={"0.3rem"} direction={"column"} width={"95vw"}>
        <HStack spacing={"0.5rem"} width={"100%"}>
            <HStack spacing={"0.3rem"} minWidth={"10rem"}>
                <FaCloudSun  height={"0.5rem"} width={"0.5rem"}/>
                <Text fontWeight={"bold"}>Morning</Text>
            </HStack>
            

            <TimeSlots timeslots={morningTime} handleClick={handleClick} />
        </HStack>
        </Stack>
        <Stack flexWrap={"wrap"} spacing={"0.75rem"} p={"0.3rem"} direction={"column"} width={"95%"}>
        <HStack spacing={"0.5rem"} width={"100%"}>
            <HStack spacing={"0.3rem"} minWidth={"10rem"}>
                <FaSun height={"0.5rem"} width={"0.5rem"} />
                <Text fontWeight={"bold"}>Afternoon</Text>
            </HStack>

            <TimeSlots time={time} timeslots={aftrenoonTime} handleClick={handleClick} />
        </HStack>
        </Stack>
        <Stack flexWrap={"wrap"} spacing={"0.75rem"} p={"0.3rem"} direction={"column"} width={"95%"}>
        <HStack spacing={"0.5rem"} width={"100%"}>
            <HStack spacing={"0.3rem"} minWidth={"10rem"}>
                <FaCloudMoon height={"0.5rem"} width={"0.5rem"}/>
                <Text fontWeight={"bold"}>Evening</Text>

            </HStack>
            
            <TimeSlots time={time} timeslots={eveningTime} handleClick={handleClick}  />
        </HStack>
        </Stack>
        {openModal && <AppointmentModal date={date} setTime={setTime} time={time} isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal} id={id}/>}
    </Stack>
  );
};

export default AvailableTimeSlots;
