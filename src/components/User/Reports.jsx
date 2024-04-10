import { Button, Heading, Input, Stack,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addReport, fetchReports } from '../redux/actions/patient';

const Reports = () => {
  
  const {reports,loading}=useSelector(state=>state.patient);
  const [report,setReport]=useState()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = () => {
      
      setReport(file)
    };
    
  };
  const dispatch=useDispatch();
  const uploadReport=async()=>{
    let formData=new FormData();
    formData.append("file",report);

    dispatch(addReport(formData))
  }

  useEffect(()=>{
    dispatch(fetchReports())
  },[dispatch])
  return (
    <Stack alignItems={"center"} height={"100vh"} width={"100%"}>
      <Heading children="All Reports" color={"blue.800"} textAlign={"center"} mt={"4"}/>
      <Input type='file' name='report'  onChange={handleFileChange} width={"40%"} margin={"0 auto"} justifyContent={"center"} mt={"2"}/>
      <Button onClick={uploadReport} width={"30%"} color={"blue.600"} mb={"2"}>
          Upload Report
      </Button>
      {
        reports?.length==0  && !loading && <Text textAlign={"center"}>
          Oops!! No Reports availbale
        </Text>
      }
      {
        reports?.length>0 && reports?.map((item,index)=>(
          <Link 
            to={item.url} 
            style={{
              color: "#000",
              width: "80%",
              textDecoration: "none", 
              display: "inline-block", 
              padding: "5px", 
              borderRadius: "5px", 
              backgroundColor:"#d4e5f0",
              transition: "background-color 0.3s ease", 
              
            }}
          > 
            
            Report {index + 1}
          </Link>
        ))

      }
    </Stack>
  )
}

export default Reports