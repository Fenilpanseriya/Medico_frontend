import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Banner from './Banner'
import Search from './Search'
import Servicescard from './Servicescard'
import About from './About'
import Footer from '../Footer'

const Home = ({status}) => {
  // const [status,setStatus]=useState("logout")
  // useEffect(()=>{
  //   setStatus(localStorage.getItem("status"))
  // },[])
  return (
    <div>
        <Header  status={status}/>
        <Search/>
        <Banner/>
        <Servicescard/>
        <About/>
        <Footer/>
    </div>
    
  )
}

export default Home