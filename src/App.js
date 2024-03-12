
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import AuthFormat from "./components/authentication/AuthFormat"
import Doctors from './components/Doctors/Doctors';

function App() {
  return (
    <div className="App" style={{height:"100vh"}}>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup/:role' element={<Signup/>}/>
          <Route path='/signup' element={<AuthFormat/>}/>
          <Route path='/finddoctor' element={<Doctors/>}/>
          <Route path='/finddoctor/:location/:degree' element={<Doctors/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
