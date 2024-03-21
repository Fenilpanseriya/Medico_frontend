
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import AuthFormat from "./components/authentication/AuthFormat"
import Doctors from './components/Doctors/Doctors';
import DoctorProfile from './components/Doctors/DoctorProfile';
import AdminLogin from './components/Admin/AdminLogin';
import DoctorLogin from './components/Doctors/DoctorLogin';
import AdminProfile from './components/Admin/AdminProfile';
import UserProfile from './components/User/UserProfile';
import { useEffect,useState,useContext } from 'react';

function App() {

  
  return (
    <div className="App" style={{height:"100vh"}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
          <Route path='/doctor-login' element={<DoctorLogin/>}/>
          <Route path='/signup/:role' element={<Signup/>}/>
          <Route path='/signup' element={<AuthFormat/>}/>
          <Route path='/finddoctor' element={<Doctors/>}/>
          <Route path='/getAllDoctor' element={<Doctors/>}/>
          <Route path='/admin-profile' element={<AdminProfile/>}/>
          <Route path='/finddoctor/:location/:degree' element={<Doctors />}/>
          <Route path='/doctor/profile/:id' element={<DoctorProfile/>}/>
          <Route path='/Account' element={<UserProfile url='/account'  />}/>
          <Route path='/profile' element={<UserProfile url='/account'  />}/>
          <Route path='/Appointments' element={<UserProfile url='/appointments'  />}/>
          <Route path='/Medicines' element={<UserProfile url='/medicines'  />}/>
          <Route path='/Lab-Tests' element={<UserProfile url='/labtests' />}/>
          <Route path='/Reports' element={<UserProfile url='/reports'  />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
