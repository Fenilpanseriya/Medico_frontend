import { Box, Stack ,Text,Image,Button} from '@chakra-ui/react'
import React, { useState,useEffect, useContext} from 'react'
import health from "../assets/header_logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { routes } from './Home/routes'
import "../../src/App.css"
import { Box as Boxes} from '@mui/material'
import {  IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import { AuthContext } from '../AuthProvider'

const Header = ({status}) => {
  
  const [isMobile,setIsMobile]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const {  login, logout } = useContext(AuthContext);
  
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
  const navigate=useNavigate()
  const handleLogout=()=>{
    
    alert("logout done")
    localStorage.setItem("status","logut")
    logout()
    navigate("/login")

  } 
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <Box width={"full"} backgroundColor={"#eef4f9"} padding={"3rem 0"} justifyContent={"center"}  style={{boxSizing:"border-box"}}>
        <Box maxWidth={"1250px"} width={"95%"} margin={"0 auto"}>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between",width:"100%"}}>
              <Stack direction={"row"} spacing={0} alignItems={"center"}>
                <Text children="Health" color={"blue.600"} fontWeight={"bold"} fontSize={"2rem"}/>
                <Text children="Plus" color={"blue.900"} fontWeight={"bold"}  fontSize={"2rem"} p={0}/>
                <Image src={health} alt="Health Plus Logo" />
              </Stack>
              {!isMobile ? <Boxes className='header-component'>
                
              {
                  routes.map((route)=>{

                    return status==="login" && route.text==="SignUp/Login"?
                        <><Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} onClick={handleLogout}>
                          Logout
                        </Button>
                        <Link to="/profile"key="/profile">
                          <Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                            Profile
                          </Button>
                        </Link>
                      </>
                    :(
                    <Link to={route.url} key={route.url}>
                      <Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                        { route.text}
                      </Button>
                    </Link>
                  )
                    
                })
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
                        routes.map((route)=>{

                          return status==="login" && route.text==="SignUp/Login"?
                            <><Button variant={"ghost"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} onClick={handleLogout}>
                                Logout
                              </Button>
                              <Link to="/profile"key="/profile">
                                <Button variant={"ghost"} width={"full"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                                  Profile
                                </Button>
                              </Link>
                            </>
                          :(
                            <Link to={route.url} key={route.url}>
                              <Button variant={"ghost"} width={"full"} color={"blue.600"} _hover={{borderBottom:"2px solid rgba(126, 159, 251, 0.8)" }} style={{textDecoration:"link",padding:"0.5rem"}} >
                                { route.text}
                              </Button>
                            </Link>
                          )
                        })
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