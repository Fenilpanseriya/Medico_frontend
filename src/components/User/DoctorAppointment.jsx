import { Box, Heading, Stack,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Axios } from '../../Axios'

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([])
  const fetchTodaysAppointment=async()=>{
    try {
      let response=await Axios.get("/todays-appointment",{withCredentials:true,
        params:{
          date:"Tue Mar 19 2024",
          role:localStorage.getItem("role")
      }})
      if(response.status===200){
        console.log(response.data.appointmentData)
        setAppointments(response.data.appointmentData)
      }
    } catch (error) {
      console.log("eroor in doctorAppointment is "+ error.message);
    }
  }
  useEffect(()=>{
    fetchTodaysAppointment()
  },[])

  return (
    <Stack spacing={"1rem"} minHeight={"100vh"} height={"100%"} width={"100%"} overflow={"scroll"} padding={"1rem"} >
      <Heading children="Todays Appointment"/>
      {
        appointments?.map((appointment)=>{
          return <Box>
              <Text>
                PatientName :- {appointment.name}
              </Text>
              <Text>
                AppointmentDate :- {appointment.appointmentDate}
              </Text>
              <Text>
                AppointmentTime :- {appointment.appointmentTime}
              </Text>
              <Text>
                PatientName :- {appointment.name}
              </Text>

          </Box>
        })
      }
    </Stack>
  )
}

export default DoctorAppointment