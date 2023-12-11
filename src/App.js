
import './App.css';
//import { Login,} from './components/Login';
//import { Signup } from './components/Signup';
import React, { useState,useEffect } from "react";
import {BrowserRouter as Router,Routes,Route,} from 'react-router-dom'
import Login from './components/Login';
import  Signup  from './components/Signup';
import HomePage from './components/HomePage';
import Club from './components/Club/Club';
import Showclub from './components/Club/Showclub';
import Createclub from './components/Club/Createclub';
import Profile from './components/Profile';
import Events from './components/Events/Events'
import Showevents from './components/Events/Showevents';
import Createevents from './components/Events/Createevents';
import Map from './components/Map/Map';

import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";



function App() {

const [loading,setLoading]=useState(false);
  useEffect(() =>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
  return (
    <div className="App">
      
    {
      loading ?
      <ClimbingBoxLoader
      color={"#000000"}
      loading={loading}
      size={35}
    />
   
      :
    <Router>
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/HomePage" element={<HomePage/>}/>
        <Route path='/createclub' element={<Createclub/>}/>
        <Route path='/club' element={<Club/>}/>
        <Route path='/Showclub/:clubid' element={<Showclub/>}/>
        <Route path='/createclub' element={<Createclub/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Events' element={<Events/>}/>
        <Route path='/Showevents/:eventid' element={<Showevents/>}/>
        <Route path='/createevents' element={<Createevents/>}/>
        <Route path='/map' element={<Map/>}/>
      </Routes>  
      
    
    </Router>
    }
    </div>
  );
}

export default App;
