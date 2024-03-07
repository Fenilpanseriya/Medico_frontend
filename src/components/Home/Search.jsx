import { Stack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { cities } from "./constant";
import { profession as Doctors } from "./constant";
import "../../App.css"
const Search = () => {
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState("");
  return (
    <Stack
      spacing={"1rem"}
      direction={["column", "row"]}
      pt={"3rem"}
      maxWidth={"1250px"}
      margin={"0 auto"}
      justifyContent={"center"}
      
    >
        <VStack spacing={"1rem"} width={"50%"} border={"2px solid #2B6CB0"}  margin={["0 auto","0"]}>
            <input name='city' placeholder='City'  list='suggestion' style={{width:"100%",padding:"0.5rem"}}/>
            <datalist id='suggestion' style={{width:"100%"}}>
                {cities?.map((city1,index) =>{
                    return (<option key={index} value={city1} onClick={(e)=>setCity(e.target.value)}>{city1}</option>)
                })}
            </datalist>

        </VStack>
        <VStack pacing={"1rem"} width={"50%"} border={"2px solid #2B6CB0"} margin={["0 auto","0"]}>
            <input name='doctor' placeholder='Doctor'  list='doctors' style={{width:"100%",padding:"0.5rem"}}/>
            <datalist id='doctors' style={{width:"100%"}}>
                {Doctors?.map((doctor,index) =>{
                    return (<option key={index} value={doctor} onClick={(e)=>setProfession(e.target.value)}>{doctor}</option>)
                })}
            </datalist>

        </VStack>
   
     
     
    </Stack>
  );
};

export default Search
