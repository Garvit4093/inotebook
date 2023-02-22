import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import {Home} from './components/Home';
import {About} from './components/About';
import Login from './components/Login';
import Sign from './components/Sign';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
function App() {
  const [alert,setAlert]= useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/" element={<Home showAlert={showAlert}/>}/>
        <Route path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route path="/signUp" element={<Sign showAlert={showAlert}/>}/>
        </Routes>
      </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
