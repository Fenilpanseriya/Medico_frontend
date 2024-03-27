import { Avatar, Button, FormLabel, Heading, Input, Stack, VStack ,Textarea} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios';
import { Select as Selects } from '@chakra-ui/react';
const UserAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    experience: "",
    age: "",
    birthDate: "",
    phoneNumber:"",
    gender: "",
    patientAddress: "",
    avatar: "",
    doctorDegree: [],
    hospital:[]
  });
  
  const getProfileDetails=async()=>{
    try {
      let response=await Axios.get("/get-profile-info",{withCredentials:true});
      if(response.status===200){
        setFormData(response.data.info)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  useEffect(()=>{
    getProfileDetails()
  },[])
  return (
    <Stack spacing={"2rem"} direction={["column"]} width={"100%"}>
        <Stack spacing={"1rem"} alignItems={"center"} width={"100%"}>
            <Avatar src="https://avatars.githubusercontent.com/u/6037598?v=4" height={"200px"} width={"200px"} />
            <Button variant={"solid"} colorScheme='blue'>
              Change Profile
            </Button>
        </Stack>
        <Heading children="User Details" textAlign={"center"} color={"blue.900"} mt={"4"} />
        <Stack width={"100%"} spacing={"1rem"} direction={"row"} display={"flex"} flexWrap={"wrap"} padding={"0.75rem"} justifyContent={"center"} alignItems={"center"}>
          <VStack  minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="Email" htmlFor="email" alignSelf={"flex-start"}/>
            <Input name="email" type='email'  placeholder='Email Address' value={formData.email} onChange={handleChange} width={"100%"} />
          </VStack>
          <VStack  minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="Name" alignSelf={"flex-start"}/>
            <Input name="name" type='text'  placeholder='Your Name' value={formData.name} onChange={handleChange} width={"100%"} />
          </VStack>
          <VStack  minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="birthDate" alignSelf={"flex-start"} />
            <Input name="birthDate" type='date'   value={formData.birthDate} width={"100%"} onChange={handleChange} />
          </VStack>
          <VStack minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="Gender" alignSelf={"flex-start"} />
            <Selects
                name="gender"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                value={formData.gender}
                onChange={handleChange}
                minWidth={"40%"}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Selects>
          </VStack>
          
          <VStack  minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="phoneNumber" alignSelf={"flex-start"}/>
            <Input name="phoneNumber" type='text'  placeholder='phoneNumber' value={formData.phoneNumber} onChange={handleChange} width={"100%"} />
          </VStack>
          <VStack  minWidth={"40%"}>
            <FormLabel fontWeight={"bold"} children="Address" alignSelf={"flex-start"}/>
            <Textarea name="address" type='text'  placeholder='Address' value={formData.patientAddress} onChange={handleChange} width={"100%"} />
          </VStack>
          
        </Stack>
        <Button variant="solid" colorScheme={"blue"} width={"30%"} alignSelf={"center"}>
          Save Changes
        </Button>
    </Stack>
  )
}

export default UserAccount