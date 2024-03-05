import { Box, Stack ,Text,Image,Button, HStack} from '@chakra-ui/react'
import React from 'react'
import health from "../assets/header_logo.png"
import { Link } from 'react-router-dom'
import { routes } from './Home/routes'
import "../../src/App.css"
import { wrap } from 'framer-motion'
const Header = () => {
  
  
  return (
    <Box width={"full"} backgroundColor={"whitesmoke"} padding={"50px 0"} justifyContent={"center"}  style={{boxSizing:"border-box"}}>
        <Box maxWidth={"1250px"} width={"95%"} margin={"0 auto"}>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between",width:"100%"}}>
              <Stack direction={"row"} spacing={0} alignItems={"center"}>
                <Text children="Helth" color={"blue.600"} fontWeight={"bold"} fontSize={"2rem"}/>
                <Text children="Plus" color={"blue.900"} fontWeight={"bold"}  fontSize={"2rem"} p={0}/>
                <Image src={health} alt="Health Plus Logo" />
              </Stack>
              <div className='header-component'>
              {
                  routes.map((route)=>(
                    <Link to={route.url} key={route.url}>
                      <Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                        {route.text}
                      </Button>
                  </Link>
                  ))
                }
              </div>
            </div>
        </Box>
    </Box>
  )
}

export default Header