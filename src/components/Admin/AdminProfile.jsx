import { HStack, Image, Stack, Text, VStack ,Button, useDisclosure} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import moment from 'moment'
import { admin } from './sampleAdmin'
import Header from '../Header'
import { Link } from 'react-router-dom'
import AddHospital from './AddHospital'
import ResetPassword from './ResetPassword'
import AddMedicine from './AddMedicine'

const AdminProfile = () => {
    //const { status, login, logout } = useContext(AuthContext);
    let status=localStorage.getItem("status")
    const[age,setAge]=useState(null)
    const [openModal,setOpenModal]=useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { isOpen, onOpen, onClose }=useDisclosure();
    const [modal,setModal]=useState("")
    function calculateAge(birthdate) {
        const today = moment();
        const birthdateMoment = moment(birthdate);
        const age = today.diff(birthdateMoment, 'years');
        return age;
    }

    const handleModal=(e)=>{
        e.preventDefault()
        setOpenModal(true)
        setModal(e.target.name)
        onOpen()
    }
    useState(()=>{
        setAge(calculateAge(admin.birthDate))
    },[])
  return (
    <Stack spacing={"1rem"} width={"100%"} height={"100vh"} backgroundColor={"whitesmoke"} >
        <Header status={status}/>
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
                
                
                <Button variant={"solid"} colorScheme='blue' p={4} name="Reset Password" onClick={handleModal}>
                    Reset Password
                </Button>
                
              
                <Button variant={"solid"} name="change-profile-photo" colorScheme='blue' p={4} onClick={handleModal}>
                    Change Profile Picture
                </Button>
                
                <Button variant={"solid"} name='add-hospital' colorScheme='blue' onClick={handleModal} p={4}>
                    Add Hospital
                </Button>
                <Button variant={"solid"} name='add-medicine' colorScheme='blue' onClick={handleModal} p={4}>
                    Add Medicine
                </Button>
            </Stack>
        {
            openModal && modal==="add-hospital" && <AddHospital selectedOptions={selectedOptions} isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal} setSelectedOptions={setSelectedOptions}/>
        }
        {
            openModal && modal==="change-profile-photo" && <AddHospital name="change-profile-photo"  isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal} />
        }
        {
            openModal && modal==="Reset Password" && <ResetPassword name="Reset Password"  isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal}/>
        }
        {
            openModal && modal==="add-medicine" && <AddMedicine isOpen={isOpen} onClose={onClose} setOpenModal={setOpenModal}/>

        }
    </Stack>
  )
}

export default AdminProfile