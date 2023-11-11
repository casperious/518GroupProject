import { useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
//import backgroundImage from './background.jpg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./footer";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //handling username changes
    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    //handling password changes
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const navigate = useNavigate();
    //handling submit button clicks
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            errorMessage();
        }
        else {
            //console.log("Trying to get user");
            axios.get('http://localhost:9000/getUser', {
                params: {
                    username: username,
                    password: password,
                }
            })
                .then((res) => {
                    if (res.data) {
                        successMessage();
                        localStorage.setItem("user_id", res.data._id);
                        if (res.data.isMayor == "Yes") {
                            localStorage.setItem("role", "Mayor");
                        }
                        else if (res.data.isCityOfficial == "Yes") {
                            localStorage.setItem("role", "City Official");
                        }
                        else if (res.data.isEmployee == "Yes") {
                            localStorage.setItem("role", "Employee");
                        }
                        else {
                            localStorage.setItem("role", "Citizen");
                        }
                        navigate('/')
                    }
                    else
                        alert("Wrong credentials. Login failed");
                })
                .catch((err) => alert("Error in login"));
            //console.log([username, password]);
        }
    };

    //handling success
    function successMessage() {
        alert("Successfully logged in");
    };

    //handling error
    function errorMessage() {
        alert("Please enter all fields");
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center align-items-center scontainer">
                    <form className="col-6">
                        <h2 id="ttle">User Login</h2> <br />
                        <div className="form-group">
                            <label htmlFor="uname">Username:</label>
                            <input type="text" className="form-control" id="uname" onChange={(e) => setUsername(e.target.value)} name="username" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="pword">Password:</label>
                            <input type="password" className="form-control" id="pword" onChange={(e) => setPassword(e.target.value)} name="password" />
                        </div>
                        <br />
                        <button type="button" onClick={handleSubmit} className="btn btn-primary sbutton1">Log In</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}


/*
<label className="label" style={{
                                position: 'absolute', left: '-20%', top: '15%',
                                transform: 'translate(-50%, -50%)'
                            }}>Username</label>
                            <input onChange={handleUsername} className="input" value={username} type='text' />
                            <br />

                            <label className="label" style={{
                                position: 'absolute', left: '-20%', top: '70%',
                                transform: 'translate(-50%, -50%)'
                            }}>Password</label>
                            <input onChange={handlePassword} className="input" value={password} type='password' />
                            <br />

*/