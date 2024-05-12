import React, { useState } from 'react'
import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Button,Text } from '@chakra-ui/react'
import { Axios } from '../../Axios'
const AppointmentModal = ({date=new Date(Date.now()).toDateString(),setTime,setOpenModal,id,onClose,isOpen,time}) => {

    const [email,setEmail]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("") 

    const closeHandler=()=>{
        setOpenModal(false)
        onClose();
        setTime("")
    }
    const bookAppointment=async(e)=>{
        e.preventDefault();
        console.log(email+" "+ phoneNumber);
        console.log(id)
        const response=await Axios.post("/patient/book-appointment",{
            email,phoneNumber,id,time,date
        },{
            headers:{
                //"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRlZjhjOWU5MmViMGI2YWQ5NDljNDgiLCJpYXQiOjE3MTA3NTgwMTcsImV4cCI6MTcxMjA1NDAxN30.Y5Jx0SZ3pVe_rcIi6IApqAauQjDMXPTNUGzxvwoBytY",
                "Content-Type":"application/json"
            }
        })

        if(response.status===200){
            alert("booked appointment")
            onClose()
        }
    }
  return (
    <Stack py={"16"} direction={["center","center"]} spacing={"4"}>
    <Modal onClose={onClose} isOpen={isOpen} >
            
            <ModalOverlay backdropBlur={"blur(10px)"}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <Heading  py="4" children="Book Appointment" textColor={"purple.500"} fontSize={"large"} textAlign={"center"}/>
                    <form  py="3" onSubmit={bookAppointment}>
                        
                        <Input isRequired placeholder='Email' type="email"   m={"1.5"} value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <Input isRequired placeholder='Phone No.' type="text"   m={"1.5"} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                        
                        
                        <Button colorScheme='purple' w="full" m="1.5" type='submit'>
                            <Text textAlign={"center"}>Book Appointment</Text>
                        </Button>
                        <Button  p={"5"} onClick={closeHandler} variant={"ghost"} mr="3">Cancle</Button>
                        
                    </form>
                </ModalBody>

            </ModalContent>

        </Modal>
        </Stack>
  )
}

export default AppointmentModal