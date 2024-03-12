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
  Select,
  Textarea,
  Text,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import frontImage from "../../assets/illustration.webp";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";
import { authfields } from "./authFields";
const AuthFormat = ({ role = "" }) => {
  const [toggle, setToggle] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    experience: "",
    age: "",
    birthdate: "",
    gender: "",
    address: "",
    avatar: "",
    doctorDegree: [],
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
    "MD",
    "PhD",
    "MBBS",
    // Add more degree options as needed
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
              <>
                <p style={{ color: "black", fontWeight: "bold" }}>
                  Are you Doctor?{" "}
                </p>
                <Link to={"/signup/doctor"}>
                  <Button variant={"link"} padding={"0.25rem"}>
                    Register Here
                  </Button>
                </Link>
              </>
            )}
          </HStack>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mt={8}>
              <FormLabel>Avatar</FormLabel>
              <Avatar name="avatar" src={formData.avatar} />
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                onChange={handleImage}
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

            {role === "doctor" && (
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
            )}

            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                _hover={{ borderBottom: "2px solid rgba(126, 159, 251)" }}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
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
