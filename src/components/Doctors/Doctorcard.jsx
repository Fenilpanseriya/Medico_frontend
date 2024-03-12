import { Stack, Heading, VStack,Image, Text } from '@chakra-ui/react'
import React from 'react'

const Dotorcard = ({name="",photo="",experience="",fees=0,degree=""}) => {
  return (
    <Stack spacing={"3rem"} direction={["column","row"]} padding={["4","8"]}  _hover={{backgroundColor:"whitesmoke"}}>
      <Image src={photo} alt="doctor photo" height={"20vh"} width={"20vw"}/>
      <VStack spacing={"1rem"} alignItems={'flex-start'}>
        <Heading children={name}/>
        <Text>
          {
            `Degree : ${degree}`

          }
          
        </Text>
        <Text>
          {
            `Experience : ${experience}`

          }
          
        </Text>
        <Text>
          {
            `Fees : ${fees}`

          }
          
        </Text>
      </VStack>
    </Stack>
  )
}

export default Dotorcard