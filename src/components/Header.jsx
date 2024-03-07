import { Box, Stack ,Text,Image,Button, HStack} from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import health from "../assets/header_logo.png"
import { Link } from 'react-router-dom'
import { routes } from './Home/routes'
import "../../src/App.css"
import { Box as Boxes} from '@mui/material'
import {  IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
const Header = () => {

  const [isMobile,setIsMobile]=useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  function handleResize(event) {
   event.preventDefault()
    let width = window.innerWidth;
    if(width<=430){
      setIsMobile(true)
    }
    else{
      setIsMobile(false)
      
    }
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box width={"full"} backgroundColor={"whitesmoke"} padding={"3rem 0"} justifyContent={"center"}  style={{boxSizing:"border-box"}}>
        <Box maxWidth={"1250px"} width={"95%"} margin={"0 auto"}>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between",width:"100%"}}>
              <Stack direction={"row"} spacing={0} alignItems={"center"}>
                <Text children="Health" color={"blue.600"} fontWeight={"bold"} fontSize={"2rem"}/>
                <Text children="Plus" color={"blue.900"} fontWeight={"bold"}  fontSize={"2rem"} p={0}/>
                <Image src={health} alt="Health Plus Logo" />
              </Stack>
              {!isMobile ? <Boxes className='header-component'>
                
              {
                  routes.map((route)=>(
                    <Link to={route.url} key={route.url}>
                      <Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                        {route.text}
                      </Button>
                  </Link>
                  ))
                }
              </Boxes>:(
                <Stack spacing={4} >
                <IconButton
                  aria-label="Open menu"
                  icon={<FaBars />}
                  onClick={toggleDrawer}
                />
          
                <Drawer placement="right" onClose={toggleDrawer} isOpen={isOpen} >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                      <Stack spacing={4}>
                      {
                        routes.map((route)=>(
                        <Link to={route.url} key={route.url}>
                          <Button variant={"ghost"} w={"full"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                            {route.text}
                          </Button>
                        </Link>
                  ))
                }
                      </Stack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Stack>
              )
              
            }
              
            </div>
        </Box>
    </Box>
  )
}

export default Header