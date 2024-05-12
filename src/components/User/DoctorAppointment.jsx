import { Box, Button, HStack, Heading, Input, Stack,Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios'
import { Typography } from '@mui/material'

const DoctorAppointment = () => {

  const [loading,setLoading]=useState(false)
  const [appointments, setAppointments] = useState([])
  const [done, setDone] = useState(false)
  const [formData, setFormData] = useState({
    diseasesName:"",
    medicines:"",
    caseFees:""
  });

  const fetchTodaysAppointment=async()=>{
    try {
      let response=await Axios.get("/todays-appointment",{withCredentials:true,
        params:{
          date:new Date(Date.now()).toDateString(),
          role:localStorage.getItem("role")
      }})
      if(response.status===200){
        console.log(response.data.appointmentData)
        setAppointments(response.data.appointmentData)
        setDone(true)
      }
    } catch (error) {
      console.log("eroor in doctorAppointment is "+ error.message);
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

  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(e.target.id)
    setLoading(true);
    let response=await Axios.post("/done-appointment",formData,{
      withCredentials:true,
      headers:{
        "Content-Type" : "application/json"
      },
      params:{
        id:e.target.id
      }
    })
    if(response.status===200){
      alert("appointment done.")
      setLoading(false);
      setFormData({
        diseasesName:"",
        medicines:"",
        caseFees:""
      })
    }
  }

  useEffect(()=>{
    fetchTodaysAppointment()
  },[])

  return (
    <Stack spacing={"1rem"} minHeight={"100vh"} height={"100%"} width={"100%"}  padding={"1rem"} >
      <Heading children="Todays Appointment" color={"blue.900"} mb={"8"}/>
      {
       appointments.length>0 ?  appointments.map((appointment)=>{
          return <Box  bgColor={"#dbdff4"} style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",width:"80%",justifySelf:"center",margin:"0 auto" }} borderRadius="lg" p={"3"} >
              <VStack alignItems={"flex-start"}>
              <Text >
                PatientName :- {appointment.name}
              </Text>
              <Text >
                AppointmentDate :- {appointment.appointmentDate}
              </Text>
              <Text >
                AppointmentTime :- {appointment.appointmentTime}
              </Text>
              </VStack>
              <form style={{gap:"1rem"}} onSubmit={handleSubmit} id={appointment.id}>
                <HStack width={"full"} mb={"2"}>
                  <Text  textAlign={"flex-start"}>diseases:-</Text>
                  <Input type='text' width={"full"} name='diseasesName' value={formData.diseasesName}  onChange={handleChange}/>
                </HStack>
                <HStack  width={"full"} mb={"2"}>
                  <Text >Medicine:-</Text>
                  <Input name='medicines' value={formData.medicines} onChange={handleChange} placeholder='medicine1,medicine2,...' type='text' width={"full"}/>
                </HStack>
                <HStack  width={"full"} mb={"2"}>
                  <Text>Fees:-</Text>
                  <Input name='caseFees' value={formData.caseFees} onChange={handleChange} placeholder='enter case fees' type='text' width={"full"}/>
                </HStack>
                <Button colorScheme='purple' type='submit'  isLoading={loading} disabled={done}>
                  Done Appointment
                </Button>
              </form>
             

          </Box>
        }):
        <Heading py={"2rem"} color="blue.600" opacity={"0.25"}>
          No appointment for today
        </Heading>
      }
    </Stack>
  )
}

export default DoctorAppointment