import { Stack, Heading, VStack,Image, Text, HStack } from '@chakra-ui/react'
import { DoneAllTwoTone } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Doctorcard = ({name="",photo="",experience="",fees=0,degree="",id="",address="",}) => {
  console.log(name,photo,experience,degree,fees)
  return (
    <Link to={`/doctor/profile/${id}`}>
    
    <Stack spacing={"3rem"} direction={["column","row"]} padding={["4","8"]}  _hover={{backgroundColor:"whitesmoke"}}>
      <Image src={photo} alt="doctor photo" height={"18vh"} width={"20vw"}/>
      <VStack spacing={"1rem"} alignItems={'flex-start'}>
        <Heading children="Unknown"/>
        {
          address && <Text>
          {
            `Address: ${address}`
          } 
          </Text>
        }
        <Text>
          {
            `Degree : ${degree}`

          }
          
        </Text>
        <Text>
          {
            `Experience : ${experience} years of experience in ${degree}`

          }
          
        </Text>
        <Text>
          {
            `Fees : ${fees}`

          }
          
        </Text>
        {
          address && <>
            <HStack>
              <IconButton>
                <DoneAllTwoTone/>
                <Text fontWeight={"bold"}>Medical Certificate Verified</Text>
              </IconButton>
            </HStack>
          </>
        }
      </VStack>
    </Stack>
    </Link>
  )
}

export default Doctorcard