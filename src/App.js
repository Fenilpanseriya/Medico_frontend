
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import AuthFormat from 'components/authentication/AuthFormat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup/:role' element={<Signup/>}/>
          <Route path='/signup' element={<AuthFormat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
