import { useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
import backgroundImage from './background.jpg';
import axios from 'axios';

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

    //handling submit button clicks
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            errorMessage();
        }
        else {
            console.log("Trying to get user");
            axios.get('http://localhost:9000/getUser', {
                params: {
                    username: username,
                    password: password,
                }
            })
                .then((res) => {
                    if (res.data)
                        successMessage();
                    else
                        alert("Wrong credentials. Login failed");
                })
                .catch((err) => alert("Error in login"));
            console.log([username, password]);
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
            <div className="Title" style={{
                position: 'absolute', left: '50%', top: '40%',
                transform: 'translate(-50%, -50%)',
            }}>
                <h1>Login Page</h1>
                <br></br>
            </div>
            <br />
            <div style={{
                position: 'absolute', left: '53%', top: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <h2 className="Data" >
                    <form>
                        <h3>

                            <span class="input-group-text" id="inputGroup" style={{
                                position: 'absolute', left: '-23%', top: '21%',
                                transform: 'translate(-50%, -50%)'
                            }}>Username</span>
                            <input type="text" class="form-control" aria-label="Example input" aria-describedby="inputGroup" onChange={handleUsername}></input>
                            <br />
                        </h3>
                        <h3>
                            <span class="input-group-text" id="inputGroup" style={{
                                position: 'absolute', left: '-22%', top: '67%',
                                transform: 'translate(-50%, -50%)'
                            }}>Password</span>
                            <input type="password" class="form-control" aria-label="Example input" aria-describedby="inputGroup" onChange={handlePassword}></input>
                            <br />

                        </h3>
                        <Button onClick={handleSubmit} style={{
                            position: 'absolute', left: '25%', top: '120%',
                            transform: 'translate(-50%, -50%)'
                        }}>Login</Button>
                    </form>
                </h2>
                <span class="input-group-text" id="inputGroup" style={{
                    position: 'absolute', left: '-23%', top: '190%',
                    transform: 'translate(-50%, -50%)'
                }}>Need an account?</span>
                <a href="/Signup" style={{
                    position: 'absolute', left: '30%', top: '190%',
                    transform: 'translate(-50%, -50%)'
                }}>Signup</a>

            </div>

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