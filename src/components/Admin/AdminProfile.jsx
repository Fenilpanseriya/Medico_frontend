import { HStack, Image, Stack, Text, VStack ,Button, useDisclosure} from '@chakra-ui/react'
import React, { useState } from 'react'
import moment from 'moment'
import { admin } from './sampleAdmin'
import Header from '../Header'
import { Link } from 'react-router-dom'
import AddHospital from './AddHospital'
const AdminProfile = () => {
    const[age,setAge]=useState(null)
    const [openModal,setOpenModal]=useState(false)
    const { isOpen, onOpen, onClose }=useDisclosure();
    function calculateAge(birthdate) {
        const today = moment();
        const birthdateMoment = moment(birthdate);
        const age = today.diff(birthdateMoment, 'years');
        return age;
    }

    const handleModal=(e)=>{
        e.preventDefault()
        setOpenModal(true)
        onOpen()
    }
    useState(()=>{
        setAge(calculateAge(admin.birthDate))
    },[])
  return (
    <Stack spacing={"1rem"} width={"100%"} height={"100vh"}>
        <Header/>
        <Stack direction={["column","row"]} spacing={"1rem"}  margin={"0 auto"} justifyContent={"center"} alignItems={"center"} padding={0} height={"max-content"}>
            <Image src={admin.photo.adminPhoto} top={0} height={"50%"} width={"50%"} borderRadius={"50%"} mt={"0rem"}/>
            <VStack spacing={"1rem"}  minWidth={"max-content"} mt={"0rem"}>
                <HStack spacing={"0.5rem"} width={"100%"} alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} >Name:</Text>
                    <Text>{admin.name}</Text>
                </HStack>
                <HStack spacing={"0.5rem"}width={"100%"} alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} left="0">Age:</Text>
                    <Text>{age}  years old</Text>
                </HStack>
                <HStack spacing={"0.5rem"}width={"100%"} alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} left="0">Email:</Text>
                    <Text>{admin.email}</Text>
                </HStack>
                <HStack spacing={"0.5rem"}width={"100%"} alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} left="0">Address:</Text>
                    <Text>{admin.adminAddress}</Text>
                </HStack>
            </VStack>
            
        </Stack>
        <Stack direction={["column","row"]} spacing={"1rem"} width={"100%"} justifyContent={"center"}>
                <Link to={"/change-profile-photo"}>
                    <Button variant={"ghost"} color={"blue.600"} p={4}>
                        Change Profile Picture
                    </Button>
                </Link>
                <Link to={"/reset-password"} variant={"ghost"} >
                    <Button variant={"ghost"} color={"blue.600"} p={4}>
                        Reset Password
                    </Button>
                </Link>
                <Button variant={"ghost"}  color={"blue.600"} onClick={handleModal} p={4}>
                    Add Hospital
                </Button>
            </Stack>
        {
            openModal && <AddHospital isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal}/>
        }
    </Stack>
  )
}

export default AdminProfile