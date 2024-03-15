import React,{useState} from 'react'
import Select from 'react-select';
import {Axios} from "../../Axios"
import {options} from "./hospitals"
import { Stack,Modal,ModalOverlay,ModalContent,ModalCloseButton,ModalBody,Heading,Input,Textarea,Button,Text } from '@chakra-ui/react'
const AddHospital = ({selectedOptions=[],isOpen,onClose,setOpenModal,setSelectedOptions}) => {
    const closeHandler=()=>{
        setOpenModal(false)
        onClose();
        setSelectedOptions([])
    }

    const [hospitalName,setHospitalName]=useState("")
    const [landmark,setLandmark]=useState("")
    const [city,setCity]=useState("")
    const [state,setState]=useState("")
    const [pincode,setPincode]=useState("")
    

    

    const handleChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
        console.log(selectedOptions)
    };

    const addHospitalHandler=async(e)=>{
        e.preventDefault();
        console.log(hospitalName,city,state,landmark,pincode)
        selectedOptions?.forEach(option=>console.log(option))
        const response =await Axios.post("/admin/add-hospital",
        {
            hospitalName:hospitalName,
            hospitalAddress:{landmark, city, state, pincode},
            diseaseSpecialist:selectedOptions,
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true
        })
        if(response.status===200){
            closeHandler()
            let hospitals=localStorage.getItem("hospitals")?JSON.parse(localStorage.getItem("hospitals")):[]
            hospitals.push(response.data.hospital.hospitalName)
            localStorage.setItem("hospitals",JSON.stringify(hospitals))
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
                    <Heading  py="4" children="Add Hospital" textColor={"purple.500"} fontSize={"large"}/>
                    <form  py="3" onSubmit={addHospitalHandler}>
                        
                        <Input placeholder='Hospital Name' type="text"   m={"1.5"} value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)} />
                        <Input placeholder='Landmark' type="text"   m={"1.5"} value={landmark} onChange={(e)=>setLandmark(e.target.value)}/>
                        <Input placeholder='City' type="text"   m={"1.5"} value={city} onChange={(e)=>setCity(e.target.value)}/>
                        <Input placeholder='State' type="text"   m={"1.5"} value={state} onChange={(e)=>setState(e.target.value)}/>
                        <Input placeholder='Pincode' type="number"   m={"1.5"} value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                        
                        <Select
                            options={options}
                            isMulti
                            value={selectedOptions}
                            onChange={handleChange}
                        />
                        <Button colorScheme='purple' w="full" m="1.5" type='submit'>
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