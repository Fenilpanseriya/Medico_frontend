import React,{useContext, useState} from 'react'
import {Stack,Image,VStack,Heading,FormControl,FormLabel,Input , HStack, Button,Text} from "@chakra-ui/react"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import frontImage from "../../assets/illustration.webp";
import Doctornavigator from './Doctornavigator';
import AdminNavigator from './AdminNavigator';
import PatientNavigator from './PatientNavigator';
import { Axios } from '../../Axios';
import { AuthContext } from '../../AuthProvider';
const Login = ({role=""}) => {
  const navigate=useNavigate();
  const location=useLocation();
  const {  login } = useContext(AuthContext);
  console.log(location)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("FORM DATA IS " + JSON.stringify(formData));
      let url=location.pathname==="/doctor-login"?"/loginDoctor":"/login"
      let response=await Axios.post(url,formData,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      if(response.data.success){
        login();
        sessionStorage.setItem("status","login")
        navigate("/")
      }
      else{
        alert(response.data.message);
      }
    
  };
 
  return (
    <>
      <Header />
      <Stack
        direction={["column", "row"]} // Stack direction changes to column for small screens
        margin="0 auto"
        spacing={["1rem", "2rem"]}
        justifyContent="center"
        maxWidth="1250px"
        p={4}
      >
        <Image
          src={frontImage}
          mt={"auto"}
          mb={"auto"}
          style={{ objectFit: "contain", maxWidth: "40%" }}
          objectFit={"contain"}
          maxWidth={"40%"}
          margin={["0 auto", "auto 1em"]}
        />
        
        <VStack
          spacing={["2", "4"]}
          width={"100%"}
          justifyContent={"center"}
          mt={4}
        >
          <Heading
            children="Login"
            textAlign={"center"}
            color={"blue.700"}
          />
          <VStack >
            <HStack justifyContent={"flex-end"}>
            {location?.pathname !== "/login" && (
              <>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                  {location?.pathname==="/doctor-login"?"1000+ Doctors Joined ":"Welcome Admin!! Please Login Here"}
                  
                </h2>
                {location?.pathname==="/doctor-login" && <HStack spacing={0} direction={"row"}>
                  <Text
                    children="Helth"
                    color={"blue.600"}
                    fontWeight={"bold"}
                    fontSize={"1.5rem"}
                  />
                  <Text
                    children="Plus+"
                    color={"blue.900"}
                    fontWeight={"bold"}
                    fontSize={"1.5rem"}
                    p={0}
                  />
                </HStack>
                }
              </>
            ) }
              
            </HStack>
            <>
              <Stack direction={["column","row"]} spacing={"1rem"}>
                {
                  location.pathname==="/login"&&<><Doctornavigator/><AdminNavigator/></>
                }
                {
                  location.pathname==="/doctor-login" && <><PatientNavigator/><AdminNavigator/></>
                }
                {
                  location.pathname==="/admin-login" && <><PatientNavigator/><Doctornavigator/></>
                }
              </Stack>
              
              </>
            
          </VStack>
          <form onSubmit={handleSubmit}>

          <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormControl>
            <HStack>
            <p style={{ color: "black" ,fontWeight:"bold"}}>Are you new user? </p>
                <Link to={"/signup"}>
                  <Button variant={"link"} padding={"0.25rem"}>
                    Register Here
                  </Button>
            </Link>
            </HStack>
            <Button
              mb="4"
              mt={"4"}
              colorScheme="purple"
              type="submit"
              color={"black"}
              _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
            >
              Login
            </Button>

          </form>
          </VStack>

        </Stack>

    </>
  )
}

export default Login