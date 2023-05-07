import React, { useState, useEffect } from "react";
import './AddStudent.css'
import { validateTeamID } from "../General/validateTeamID";
import { formatTeamIDNumber } from "../General/formatTeamIDNumber";

/* 
The Question component has logic to render a quiz question, including the description 
and making an answer component for each possible answer
*/

function AddStudent(props) {
    const[studentEmail, setStudentEmail] = useState("");
    const[team, setTeam] = useState("");
    const[studentID, setStudentID] = useState();

    const getTeam = async(requestedTeam) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'teamID': requestedTeam})
            }
            const response = await fetch('/api/team/get_team', requestOptions)
            const jsonData = await response.json()
            return jsonData;

        } catch (error) {
            console.log(error)
        }
    }

    const addCoachToStudent = async (coach_id, email) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"coachID": coach_id,"student_email": email})
            }
            const response = await fetch('/api/coach/add_coachid_to_student', requestOptions)
            const jsonData = await response.json()
            //return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }

    const getStudentID = async (email) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'student_email': email})
            }
            const response = await fetch('/api/coach/get_studentid_by_email', requestOptions)
            const jsonData = await response.json()
            return(jsonData);
        } catch (error) {
            console.log(error)
        }
    }
    
    const addStudentToTeam = (inputTeamID, inputStudentID) => {
        var tmpData = {team_id: inputTeamID, student_id: inputStudentID}
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/team/add_student_to_team', requestOptions).then(
                res => res.text()).then(text => {

              }
        );
    };
    
    useEffect(() => {
        // if(studentID !== undefined) {
        //     addStudentToTeam(team,studentID);
        // }
    }, [studentID])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateTeamID(team) || team == "") {
            const numberTeamID = formatTeamIDNumber(team);
            console.log("converted teamID in AddStudent + typeof", numberTeamID, typeof numberTeamID);
            const tempStudentID = await getStudentID(studentEmail);
            const checkTeam = await getTeam(formatTeamIDNumber(team));
            console.log("checkTeam in AddStudent", checkTeam);
            if(checkTeam) {
                setStudentID(tempStudentID);
                await addStudentToTeam(numberTeamID, tempStudentID);
                await addCoachToStudent(localStorage._id, studentEmail);
                props.closeForm();
            } else if (team == "") {
                setStudentID(tempStudentID);
                await addCoachToStudent(localStorage._id, studentEmail);
                props.closeForm();
            } else alert("Invalid Team ID. Student was not added.");
        } else {
            alert("Invalid Team ID. Student was not added.");
        }
        
    }

    if(props.enabled === true) {
        return (
            <div className="form-popup">
                <h2>Add Student</h2>
                <div>
                    <form className="add-student-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Student's Email </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                required
                            />

                            <label htmlFor='team'>Team National ID (Optional)</label>
                            <input
                                type='text'
                                id='team'
                                name='team'
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                            />
                            <button className="casa-button" type="submit">Add</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default AddStudent;