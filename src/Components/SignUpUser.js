import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import '../static/companySignUp.css'
import { useNavigate } from 'react-router-dom';

const onSignUp = (event, fName, lName, email, pword) => {
    event.preventDefault();
}

const SignUpUser = () => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
	const [pword, setPword] = useState("");
    const navigate = useNavigate();

    
    useEffect(() => {
        //axios.get('http://localhost:9000/getDepartments')
                //.then((res) => setDepartments(res.data))
              //.catch((err) => alert('Error in Fetching Departments'))
      }, []);

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center scontainer">
          <form className="col-6">
			      <h2 id="ttle">User SignUp</h2> <br/>
            <div className="form-group">
              <label htmlFor="uname">First Name:</label>
              <input type="text" className="form-control" id="uname" onChange={(e) => setFName(e.target.value)} name="username" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="uname">Last Name:</label>
              <input type="text" className="form-control" id="uname" onChange={(e) => setLName(e.target.value)} name="username" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setPword(e.target.value)} name="email" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="pword">Password:</label>
              <input type="password" className="form-control" id="pword" onChange={(e) => setPword(e.target.value)} name="password" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" onChange={(e) => setPword(e.target.value)} name="name" />
            </div>
            <br/>
            <button type="button" onClick={onSignUp} className="btn btn-primary sbutton1">Sign Up</button>           
          </form>
        </div>
      </div>
    );
  }

export default SignUpUser;