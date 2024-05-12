import { Stack, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { cities } from "./constant";
import { profession as Doctors } from "./constant";
import "../../App.css"
import { useNavigate } from "react-router";
import axios from "axios";
const Search = () => {
    const [city, setCity] = useState("");
    const [profession, setProfession] = useState("");
    const [location,setLocation]=useState("")
    const [degree,setDegree]=useState([])
    let navigate=useNavigate();

    const navigatePage=()=>{
        
        if(city && profession){
            navigate(`/finddoctor/${city}/${profession}`)
        }
    }

    
    navigatePage()
    useEffect(()=>{
        console.log(city)
        console.log(profession)
        
    },[])
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
            <input name='city' placeholder='City'  list='suggestion' style={{width:"100%",padding:"0.5rem"}} value={city} onChange={(e)=>setCity(e.target.value)} />
            <datalist id='suggestion' style={{width:"100%"}}>
                {cities?.map((city1,index) =>{
                    return (<option key={index} value={city1} >{city1}</option>)
                })}
            </datalist>

        </VStack>
        <VStack pacing={"1rem"} width={"50%"} border={"2px solid #2B6CB0"} margin={["0 auto","0"]}>
            <input name='doctor' placeholder='Doctor'  list='doctors' style={{width:"100%",padding:"0.5rem"}} value={profession} onChange={(e)=>setProfession(e.target.value)}/>
            <datalist id='doctors' style={{width:"100%"}}>
                {Doctors?.map((doctor,index) =>{
                    return (<option key={index} value={doctor} >{doctor}</option>)
                })}
            </datalist>

        </VStack>
    </Stack>
);
};

export default Search
