import React, { useState, useEffect } from "react";
import './ManageTeams.css'
import '../General/casa-table.css'
//import AddStudent from "./AddStudent";
//import MakeTeam from "./MakeTeam";
import { useNavigate } from "react-router-dom";
import {loginChecker} from "../General/LoginCheck";
import {FaArrowUp, FaArrowDown, FaGripLines} from "react-icons/fa";
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";
import { formatTeamIDString } from "../General/formatTeamIDString";
import { validateTeamID } from "../General/validateTeamID";

function TeamOversight(props) {
const [enabledShowTeamPerformance, setEnabledShowTeamPerformance] = useState("")
const [coachUserID, setCoachUserID] = useState();
const [coach, setCoach] = useState();
const [teams, setTeams] = useState([]);
}

const getCoach = async(coachID) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'id': coachID})
        }
        const response = await fetch('/api/coachSearch', requestOptions)
        const jsonData = await response.json()

        setCoach(jsonData)
    } catch (error) {
        //console.log(error)
    }

    const getTeams = async (inputTeams) => {
        var tempTeams = [];
        for(let i = 0; i < inputTeams.length; i++){
            try {
                const requestOptions = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                };
                const response = await fetch('/api/teamsearch/' + JSON.stringify(inputTeams[i]), requestOptions);
                const jsonData = await response.json();
                tempTeams.push(...jsonData);
            } catch (error) {
                //console.log("error in getTeams: ", error);
            }
        }
        setTeams(tempTeams);
    }

    //gets a team's name based on teamID
    const getTeamName = (teamID) => {
        var teamName = "";
        teams.map(team => {
            if(team.national_id == teamID) {
                teamName = team.name;
            }
        })
        return teamName;
    }

    // const search = async (e) => {

    //     const matchedUsers = teams.filter((team) => {
    //         return team.name.toLowerCase().includes(e.target.value.toLowerCase());
    //     });
    //     if (e.target.value.length == 0) {
    //         setTeams(allUsersCopy);
    //         setSearchPhrase(e.target.value);
    //     }
    //     else {
    //         setStudents(matchedUsers);
    //         setSearchPhrase(e.target.value);
    //     }
    // }
    
    if (props.enabled == true) {
        return (
            <div>
                <table style={{ color: '#fff' }}>
                   <thead>
                        <tr>
                            <th>Team Name</th>
                        </tr>
                   </thead>
                   <tbody>
                   {teams && teams.map((item, index) => (
                            <tr>
                                <td className={index % 2 === 0 ? 'td-even' : 'td-odd'}> {item.displayname}</td>
                            </tr>
                        ))}
                   </tbody>
                </table>
            </div>
        );
    }


}


export default TeamOversight;