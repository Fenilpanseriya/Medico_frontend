import React from 'react'
import img1 from "../../assets//video-consultant.png";
import img2 from "../../assets/doctor1.png";
import img3 from "../../assets/medicine.png";
import img4 from "../../assets/medical-test.png";
import { Heading, Image, Stack, VStack,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import "../../App.css"
const Servicescard = () => {
  const cardImages=[img1,img2,img3,img4];
  const cardRoutes=["/videoConsultant","/nearDoctor","/medicine","/labtest"];
  const cardheadings=["Video Service","Find Doctors","Medicines","Lab Tests"];
  const cardText=["Connect with in 60s","you can find doctors near you","Essentials at your doorstep","Sample pick up at your home"]
  return (
    
    <Stack direction={["column","row"]} spacing={"1rem"}maxWidth={"1250px"} margin={"0 auto"} justifyContent={"cennter"} height={"max-content"} marginTop={"2rem"} mb={"5rem"}  >
        {
          cardImages.map((img,index)=>(
            <Link to={cardRoutes[index]} key={index} width={"25%"} style={{minHeight:"290px"}} className='card'>
              <VStack spacing={"0.5rem"} padding={"0.25rem"}  width={"100%"} className='card' margin={["1rem","0 auto"]} justifyContent={"center"} style={{height:"100%"}}>
                <Image src={img} alt="services"  borderRadius={"3%"}  _hover={{borderBottom:"4px solid rgba(126, 159, 251, 0.9)" }}width={"100%"} className='vg'/>
                <Heading children={cardheadings[index]} color={"blue.600"}/>
                <Text>
                  {
                    cardText[index]
                  }
                </Text>
              </VStack>
            </Link>
          ))
        }
    </Stack> 
  )
}

export default Servicescard