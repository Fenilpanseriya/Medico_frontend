import React from 'react'
import Header from '../Header'
import Banner from './Banner'
import Search from './Search'
import Servicescard from './Servicescard'
import About from './About'
import Footer from '../Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <Search/>
        <Banner/>
        <Servicescard/>
        <About/>
        <Footer/>
    </div>
    
  )
}

export default Home