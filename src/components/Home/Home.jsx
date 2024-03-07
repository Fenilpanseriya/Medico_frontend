import React from 'react'
import Header from '../Header'
import Banner from './Banner'
import Search from './Search'
import Servicescard from './Servicescard'
import About from './About'

const Home = () => {
  return (
    <div>
        <Header/>
        <Search/>
        <Banner/>
        <Servicescard/>
        <About/>
    </div>
    
  )
}

export default Home