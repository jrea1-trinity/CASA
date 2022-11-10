import './App.css';
import Login from "../Login/Login";
import About from "../About/About";
import DevPage from "../DevPage/DevPage";
import CreateUser from "../CreateUser/CreateUser";
import NotFound from "../NotFound/NotFound";

// eslint-disable-next-line
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import ViewTeams from '../ViewTeams/ViewTeams';
import TeamStats from '../TeamStats/TeamStats';
import FindMentor from '../FindMentor/FindMentor';
import AssessTest from '../AssessTest/AssessTest';
import ViewScores from '../ViewScores/ViewScores';
import Dropdown from '../Dropdown/Dropdown';

import MentorAssessment from "../AssessTest/MentorAssessment";

//import Profile from
//Routes, Route, Link
function App() {

  useEffect(() => {
    document.title = "CASA - Cyberware Texas"
  }, []);

  return (
    <div className="App">
      {/*<Navbarmenu />   
         <Mentor/>

*/}
   <Dropdown />


      <Routes basename = "/">
   
        <Route path="*" element={<NotFound/>} />
        <Route path="about" element={<About/>} />
        <Route path="dev" element={<DevPage/>} />
        <Route path="createuser" element={<CreateUser/>} />
        <Route path="login" element={<Login/>} />
             
          <Route exact path="/" element ={<Home/>}/>
          <Route path="Profile" element={<Profile/>} />
          <Route path="ViewTeams" element={<ViewTeams/>} />
          <Route path="TeamStats" element={<TeamStats/>} />
          <Route path="FindMentor" element={<FindMentor/>} />
          <Route path="AssessTest" element={<AssessTest/>} />
          <Route path="ViewScores" element={<ViewScores/>} />
          
      <Route path="mentorassessment" element={<MentorAssessment/>} />
      

        
      </Routes>
    </div>
  );
}

export default App;
