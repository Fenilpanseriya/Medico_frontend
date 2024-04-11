import React,{useState} from 'react'

import {Axios} from "../../Axios"

import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Button,Text } from '@chakra-ui/react'
const ResetPassword = ({isOpen,onClose,setOpenModal,}) => {
    const closeHandler=()=>{
        setOpenModal(false)
        onClose();
        
    }
    const [medicine,setMedicine]=useState("")
    const [stockOfMedicine,setStockOfMedicine]=useState(0)
    const [hospitalName,setHospitalName]=useState("")

    const resetPasswordHandler=async(e)=>{
        e.preventDefault();
        
        let response=await Axios.post("/admin/add-medicine",{hospitalName,medicine,stockOfMedicine},{
            withCredentials:true,
            params:{
                role:localStorage.getItem("role")
            }
        });
        if(response.status===200){
            closeHandler()
            alert(response.data.message)
        }
        
    }
    
  return (
    <Stack py={"16"} direction={["center","center"]} spacing={"4"}>
    <Modal onClose={onClose} isOpen={isOpen} >
            
            <ModalOverlay backdropBlur={"blur(10px)"}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <Heading  py="4" children="Reset Password" textColor={"purple.500"} fontSize={"large"} textAlign={"center"}/>
                    <form  py="3" onSubmit={resetPasswordHandler}>
                        
                        <Input placeholder='Medicine name' type="text"   m={"1.5"} value={medicine} onChange={(e)=>setMedicine(e.target.value)} />
                        <Input placeholder='Medicine stock' type="text"   m={"1.5"} value={stockOfMedicine} onChange={(e)=>setStockOfMedicine(e.target.value)}/>
                        <Input placeholder='Hospital Name' type="text"   m={"1.5"} value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)}/>
                        <Button colorScheme='purple' w="full" m="1.5" type='submit'>
                            <Text textAlign={"center"}>Add Medicine</Text>
                        </Button>
                        <Button  p={"5"} onClick={closeHandler} variant={"ghost"} mr="3">Cancle</Button>
                        
                    </form>
                </ModalBody>

            </ModalContent>

        </Modal>
        </Stack>
  )
}

export default ResetPassword