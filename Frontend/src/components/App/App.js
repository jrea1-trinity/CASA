import './App.css';
import Login from "../Login/Login";
import About from "../About/About";
import DevPage from "../DevPage/DevPage";
import CreateUser from "../CreateUser/CreateUser";
import NotFound from "../NotFound/NotFound";

import TableMentor from "../TableMentor/TableMentor";

// eslint-disable-next-line
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import {useEffect} from 'react';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import ViewTeams from '../ViewTeams/ViewTeams';
import TeamStats from '../TeamStats/TeamStats';
import AssessTest from '../AssessTest/AssessTest';
import ViewScores from '../ViewScores/ViewScores';
import Dropdown from '../Dropdown/Dropdown';

import MentorAssessment from "../AssessTest/MentorAssessment";

//import Profile from
//Routes, Route, Link
function App() {

  useEffect(() => {
    document.title = "CASA - Cyberware Texas"

    callBackendAPI()
      .then(res => console.log(res))
      .catch(err => console.log(err));

  }, []);

  async function callBackendAPI(){
    const response = await fetch('/api');
    const body = await response.text();

    if (response.status !== 202) {
      throw Error(body.message) 
    }
    return body;
  };
  

  return (
    <div className="App">
      <Dropdown/>
      <Routes basename = "/">
   
        <Route path="*" element={<NotFound/>} />
        <Route path="about" element={<About/>} />
        <Route path="dev" element={<DevPage/>} />
        <Route path="createuser" element={<CreateUser/>} />
        <Route path="login" element={<Login/>} />


          <Route exact path="/" element ={<Home/>}/>
          <Route path="Profile" element={<Profile/>} />
          <Route path="TableMentor" element={<TableMentor/>} />

          <Route path="ViewTeams" element={<ViewTeams/>} />
          <Route path="TeamStats" element={<TeamStats/>} />
          <Route path="AssessTest" element={<AssessTest/>} />
          <Route path="ViewScores" element={<ViewScores/>} />

      <Route path="mentorassessment" element={<MentorAssessment/>} />
      

        
      </Routes>
    </div>
  );
}

export default App;