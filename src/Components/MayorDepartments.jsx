import { useEffect, useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
//import backgroundImage from './background.jpg';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";

export default function MayorDepartments() {
    const [departments, setDepartments] = useState([]);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        axios.get('http://localhost:9000/getMayorDepartments',
            {
                params: {
                    user_id: user_id
                }
            })
            .then((res) => {
                if (res.data) {
                    console.log("Saved departments under mayor");
                    setDepartments(res.data);
                    //successMessage();
                }
                else
                    alert("No Departments");
            })
            .catch((err) => alert("Error in fetching departments under mayor"));
    }, []);
    function successMessage() {
        alert("Successfully assigned user story");
    };
    const handleClickAdd = (e) => {
        console.log("Clicked table row " + e._id)
        //props.history.push('/Team/${e.team_id}')
        //const navigate = useNavigate();
        // navigate(`/Team/${e._id}`)              // use ` (with tilda) not '     
        axios.post('http://localhost:9000/assignStory', {
            user_story_id: e._id,
            user_id: user_id,
        })
            .then((res) => {
                if (res.data)
                    successMessage();
                else
                    alert("User story failed to post");
            })
            .catch((err) => alert("Error in post user story"));

    }
    const handleClickDelete = (e) => {
        console.log("Clicked table row " + e._id)
        //props.history.push('/Team/${e.team_id}')
        //const navigate = useNavigate();
        // navigate(`/Team/${e._id}`)              // use ` (with tilda) not '     
        axios.post('http://localhost:9000/assignStory', {
            user_story_id: e._id,
            user_id: user_id,
        })
            .then((res) => {
                if (res.data)
                    successMessage();
                else
                    alert("User story failed to post");
            })
            .catch((err) => alert("Error in post user story"));

    }

    const handleClickModify = (e) => {
        console.log("Clicked table row " + e._id)
        //props.history.push('/Team/${e.team_id}')
        //const navigate = useNavigate();
        // navigate(`/Team/${e._id}`)              // use ` (with tilda) not '     
        axios.post('http://localhost:9000/assignStory', {
            user_story_id: e._id,
            user_id: user_id,
        })
            .then((res) => {
                if (res.data)
                    successMessage();
                else
                    alert("User story failed to post");
            })
            .catch((err) => alert("Error in post user story"));

    }

    return (
        <div>
            <NavBar />
            <div className="container" style={{
                position: 'absolute', left: '77%', top: '40%',
                transform: 'translate(-50%, -50%)',
            }}>
                <table className="table fixed-top table-striped table-bordered" style={{ width: '20%' }}>
                    <thead>
                        <tr>
                            <th> Departments </th>
                            <th> Add </th>
                            <th> Delete</th>
                            <th> Modify </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments && departments.map(dept =>
                            <tr key={dept._id} >
                                <td>{dept.name}</td>
                                <td><Button onClick={() => handleClickAdd(dept)}>Add</Button></td>
                                <td><Button onClick={() => handleClickDelete(dept)}>Delete </Button></td>
                                <td><Button onClick={() => handleClickModify(dept)}>Modify</Button></td>
                            </tr>
                        )}

                    </tbody>

                </table>


            </div>
            <Footer />
        </div>)









}