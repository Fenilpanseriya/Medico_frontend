import React,{useState} from 'react'

import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Textarea,Button,Text } from '@chakra-ui/react'
const AddHospital = ({isOpen,onClose,setOpenModal}) => {
    const closeHandler=()=>{
        setOpenModal(false)
        onClose();
    }
  return (
    <Stack py={"16"} direction={["center","center"]} spacing={"4"}>
    <Modal onClose={onClose} isOpen={isOpen} >
            
            <ModalOverlay backdropBlur={"blur(10px)"}/>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <Heading  py="4" children="Add Hospital" textColor={"purple.500"} fontSize={"large"}/>
                    <form  py="3">
                        
                        <Input placeholder='Hospital Name' type="text"   m={"1.5"} />
                        <Input placeholder='Landmark' type="text"   m={"1.5"} />
                        <Input placeholder='City' type="text"   m={"1.5"} />
                        <Input placeholder='State' type="text"   m={"1.5"} />
                        <Input placeholder='Pincode' type="number"   m={"1.5"} />
                        <Textarea  type="text" placeholder='add Description' m="1.5"/>
                        <Button onClick={closeHandler} colorScheme='purple' w="full" m="1.5" >
                            <Text textAlign={"center"}>Add Hospital</Text>
                        </Button>
                        <Button  p={"5"} onClick={closeHandler} variant={"ghost"} mr="3">Cancle</Button>
                    </form>
                </ModalBody>

            </ModalContent>

        </Modal>
        </Stack>
  )
}

export default AddHospital