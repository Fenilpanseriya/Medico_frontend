import {
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Image,
  VStack,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Heading,
  HStack,
  Button,
  Select as Selects,
  Textarea,
  Text,
} from "@chakra-ui/react";
import Select from 'react-select';
import Header from "../../components/Header";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import frontImage from "../../assets/illustration.webp";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";
import { authfields } from "./authFields";

import { Axios } from "../../Axios";



const AuthFormat = ({ role = "" }) => {
  const [toggle, setToggle] = useState(false);
  const [hospital,setHospital]=useState([{value:"Shreeji Hospital",label:"Shreeji Hospital"}])
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    experience: "",
    age: "",
    birthDate: "",
    phoneNumber:"",
    gender: "",
    address: "",
    avatar: "",
    doctorDegree: [],
    hospital:[]
  });

  const handleDegreeChange = (degree) => {
    if (formData.doctorDegree?.includes(degree)) {
      setFormData({
        ...formData,
        doctorDegree: formData.doctorDegree.filter((item) => item !== degree),
      });
    } else {
      setFormData({
        ...formData,
        doctorDegree: [...formData.doctorDegree, degree],
      });
    }
  };

  const doctorDegreeOptions = [
    "MD","Dermetologist",
    "Dentist",
    "MBBS","Nuerologist",
    "ENT","Radiology"
    
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChangeHospital = (selectedValues) => {
    setSelectedOptions(selectedValues);
    setFormData({
      ...formData,
      hospital: [...formData.hospital, selectedValues],
    });
    console.log(selectedOptions)
};
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log((formData))
    
    let url=role==="doctor"?"/registerDoctor":"/register";
  
    const res=await Axios.post(url,formData,{
      headers:{
        "Content-Type": "application/json",
      },
      withCredentials:true
    })
    if(res.status===200){
      localStorage.setItem("role",role===""?"user":role)
      localStorage.setItem("status","login")
      navigate("/")
    }
    else{
      alert(res.data.message);
    }
  }
  

  const fetchHospitals = useMemo(() => {
    return (allHospital) => {
      const latestHospitals = allHospital?.map(item => ({ value: item, label: item }));
      return latestHospitals;
    };
  }, [hospital]);

  useEffect(() => {
    const hospitalsFromLocalStorage = localStorage.getItem("hospitals") ? JSON.parse(localStorage.getItem("hospitals")) : ["Shreeji Hospital"];
    setHospital(fetchHospitals(hospitalsFromLocalStorage));
  }, []);
  

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
            children="Registration"
            textAlign={"center"}
            color={"blue.700"}
          />
          <HStack justifyContent={"flex-end"}>
            {role === "doctor" ? (
              <>
                <h2 style={{ fontSize: "1rem", fontWeight: "600" }}>
                  1000+ Doctors Joined{" "}
                </h2>
                <HStack spacing={0} direction={"row"}>
                  <Text
                    children="Helth"
                    color={"blue.600"}
                    fontWeight={"bold"}
                    fontSize={"1rem"}
                  />
                  <Text
                    children="Plus+"
                    color={"blue.900"}
                    fontWeight={"bold"}
                    fontSize={"1rem"}
                    p={0}
                  />
                </HStack>
              </>
            ) : (
              <HStack>
                <VStack>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    Are you Doctor?{" "}
                  </p>
                  <Link to={"/signup/doctor"}>
                    <Button variant={"link"} padding={"0.25rem"}>
                      Register Here
                    </Button>
                  </Link>
                </VStack>

                {
                  role!=="admin" && <VStack>
                  <p style={{ color: "black", fontWeight: "bold" }}>
                    Are you Admin?{" "}
                  </p>
                  <Link to={"/signup/admin"}>
                    <Button variant={"link"} padding={"0.25rem"}>
                      Register Here
                    </Button>
                  </Link>
                </VStack>
                }

              </HStack>

                
            )}
          </HStack>
          <form onSubmit={handleSubmit}>

            <FormControl isRequired mt={8}>
              <FormLabel>Avatar</FormLabel>
              <Avatar name="avatar" src={formData.avatar} height={"10vw"} width={"10vw"}/>
              <Input
                mt={"0.5rem"}
                type="file"
                name="avatar"
                accept="image/*"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                onChange={handleImage}
              />
            </FormControl>

            <FormControl isRequired mt={8}>
              <FormLabel>Contact No.</FormLabel>
             
              <Input
                mt={"0.5rem"}
                type="text"
                name="phoneNumber"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                onChange={handleChange}
              />
            </FormControl>

            {authfields.map((field, index) => {
              let ext = field.name;
              return (
                <HStack
                  width={"full"}
                  spacing={"1rem"}
                  key={index}
                  m={"0.5rem"}
                >
                  <FormControl isRequired={field.required}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      type={
                        field.type === "password"
                          ? !toggle
                            ? "text"
                            : "password"
                          : field.type
                      }
                      name={field.name}
                      _hover={field._hover}
                      value={formData[ext]}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  {field.name === "password" && (
                    <Image
                      src={!toggle ? view : hide}
                      alt="view"
                      height={"5%"}
                      width={"5%"}
                      mt={"2rem"}
                      onClick={() => setToggle((prev) => !prev)}
                    />
                  )}
                </HStack>
              );
            })}

            {role === "doctor" && (<>
              <FormControl isRequired>
                <FormLabel>Experience</FormLabel>
                <Input
                  type="number"
                  name="experience"
                  _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                  value={formData.experience}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hospitals </FormLabel>
                <Select
                  options={hospital}
                  value={selectedOptions}
                  isMulti
                  onChange={handleChangeHospital}
                />
              </FormControl>
              
              </>
            )}

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Selects
                name="gender"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                value={formData.gender}
                onChange={handleChange}
                
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Selects>
            </FormControl>
            
            {role === "doctor" && (
              <FormControl isRequired>
                <FormLabel>Doctor Degree</FormLabel>
                <Menu>
                  <MenuButton as={Button} rightIcon="chevron-down">
                    Select degrees
                  </MenuButton>
                  <MenuList>
                    {doctorDegreeOptions.map((degree) => (
                      <Checkbox
                        padding={"0.2rem"}
                        key={degree}
                        value={degree}
                        isChecked={formData.doctorDegree.includes(degree)}
                        onChange={() => handleDegreeChange(degree)}
                      >
                        {degree}
                      </Checkbox>
                    ))}
                  </MenuList>
                </Menu>
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              mb="4"
              mt={"4"}
              colorScheme="purple"
              type="submit"
              color={"black"}
              _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
            >
              Register
            </Button>
          </form>
        </VStack>
      </Stack>
    </>
  );
};

export default AuthFormat;
