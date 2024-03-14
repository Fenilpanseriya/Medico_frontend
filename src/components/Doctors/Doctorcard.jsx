import { Stack, Heading, VStack, Image, Text,Box } from "@chakra-ui/react";
import { Done} from "@mui/icons-material";
import { Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

const Doctorcard = ({
  name = "",
  photo = "",
  experience = "",
  fees = 0,
  degree = "",
  id = "",
  address = "",
}) => {
  console.log(name, photo, experience, degree, fees);
  if(!name || !photo || !experience || !fees || !degree  ){
    return <Typography fontSize={"2rem"} textAlign={"center"} sx={{opacity:0.7}} color={"#1A365D"}>
              OOPS!! No Doctors Available for Your Search
    </Typography>
  }
  return (
    <Link to={`/doctor/profile/${id}`}>
      <Stack
        spacing={"3rem"}
        direction={["column", "row"]}
        padding={["4", "8"]}
        _hover={{ backgroundColor: "whitesmoke" }}
      >
        <Image src={photo} alt="doctor photo" height={"18vh"} width={"20vw"} />
        <VStack spacing={"1rem"} alignItems={"flex-start"}>
          <Heading children="Unknown" color={"#1A365D"} />
          {address && <Text>{`Address: ${address}`}</Text>}
          <Text>{`Degree : ${degree}`}</Text>
          <Text>
            {`Experience : ${experience} years of experience in ${degree}`}
          </Text>
          <Text>{`Fees : ${fees}`}</Text>
          {address && (
            <>
              <Stack direction={"row"} spacing={"1rem"}>
                
                  <Done sx={{backgroundColor:"rgba(64, 112, 243, 0.8)",padding:"0.35rem",borderRadius:"1rem"}} />

               
                
                <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Medical Certificate Verified
                </p>
              </Stack>
            </>
          )}
        </VStack>
      </Stack>
    </Link>
  );
};

export default Doctorcard;
