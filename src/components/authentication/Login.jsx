import React,{useState} from 'react'
import {Stack,Image,VStack,Heading,FormControl,FormLabel,Input , HStack, Button} from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import Header from '../Header';
import frontImage from "../../assets/illustration.webp";
const Login = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM DATA IS " + JSON.stringify(formData));
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