import { Avatar, Stack, VStack } from '@chakra-ui/react'
import { Paper } from '@mui/material'
import React from 'react'

const UserAccount = () => {
  return (
    <Stack spacing={"2rem"} direction={["column"]}>
        <Stack spacing={"1rem"} justifyContent={"center"}>
            <Avatar src="https://avatars.githubusercontent.com/u/6037598?v=4" height={"200px"} width={"200px"} />
            
        </Stack>
        
    </Stack>
  )
}

export default UserAccount