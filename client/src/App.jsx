import './App.css';
import  { useState } from 'react'
import {Route,Routes,useLocation} from 'react-router-dom';
import Landing from './views/Landing/landing';
import Home from './views/Home/home';
import Detail from './views/Detail/detail';
import NewDriver from './views/New_Driver/newDriver';
import NavBar from './components/navBar/navBar';

function App() {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1); 
  const [startPage, setStartPage] = useState(1);
  const [name,setName] = useState("");
  return (
    <div>
      {pathname !== '/' && <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} name={name} setName={setName} />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home setCurrentPage={setCurrentPage} currentPage={currentPage} startPage={startPage} setStartPage={setStartPage} />} />
        <Route path='/home/:id' element={<Detail />} />
        <Route path='/newDriver' element={<NewDriver />} />
      </Routes>
    </div>
  );
}

export default App;
