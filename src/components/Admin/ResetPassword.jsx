import React,{useState} from 'react'

import {Axios} from "../../Axios"

import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Button,Text } from '@chakra-ui/react'
const ResetPassword = ({isOpen,onClose,setOpenModal,}) => {
    const closeHandler=()=>{
        setOpenModal(false)
        onClose();
        
    }
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    

    const resetPasswordHandler=async(e)=>{
        e.preventDefault();
        
        const response =await Axios.post("/admin/reset-password",
        {
            oldPassword,newPassword,
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true
        })
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
                        
                        <Input placeholder='Old password' type="text"   m={"1.5"} value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                        <Input placeholder='New password' type="text"   m={"1.5"} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        
                        <Button colorScheme='purple' w="full" m="1.5" type='submit'>
                            <Text textAlign={"center"}>Reset Pssword</Text>
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