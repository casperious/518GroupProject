import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import '../static/companySignUp.css'
import { useNavigate } from 'react-router-dom';

const SignUpCompany = () => {

    const [uname, setUname] = useState("");
	  const [pword, setPword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        //axios.get('http://localhost:9000/getDepartments')
                //.then((res) => setDepartments(res.data))
              //.catch((err) => alert('Error in Fetching Departments'))
      }, []);



	const onClickHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/createCompany', 
                {"username" : uname,
                 "password" : pword,
                 "email" : email,
                 "name" : name,
                "department" : department})
            .then((res) => alert('Company SignUp successful, Now you can Login!!!'))
            .catch((err) => alert('Error in Signing Up!'))
    setUname("");
    setPword("");
    setEmail("");
    setName("");
    setDepartment("");
    document.getElementById('uname').value="";
    document.getElementById('pword').value="";
    document.getElementById('email').value="";
    document.getElementById('name').value="";
    document.getElementById('department').value="";
  }

  const onClickLogInHandler = (event) => {
    event.preventDefault();
    setUname("");
    setPword("");
    setEmail("");
    setName("");
    setDepartment("");
    document.getElementById('uname').value="";
    document.getElementById('pword').value="";
    document.getElementById('email').value="";
    document.getElementById('name').value="";
    document.getElementById('department').value="";
    navigate('/login');
  }

    return (
      <div className="container">
        <div className="row justify-content-center align-items-center scontainer">
          <form className="col-6">
			      <h2 id="ttle">Company SignUp</h2> <br/>
            <div className="form-group">
              <label htmlFor="uname">User Name:</label>
              <input type="text" className="form-control" id="uname" onChange={(e) => setUname(e.target.value)} name="username" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="pword">Password:</label>
              <input type="password" className="form-control" id="pword" onChange={(e) => setPword(e.target.value)} name="password" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setPword(e.target.value)} name="email" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" onChange={(e) => setPword(e.target.value)} name="name" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select className="form-control" name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value={0}>Select Department</option>
                {departments.map((dpt) => (
                  <option value={dpt}>{dpt}</option>
                ))}
              </select>
            </div>
            <button type="button" onClick={onClickHandler} className="btn btn-primary sbutton1">Sign Up</button>
            <button type="button" onClick={onClickLogInHandler} className="btn btn-link lbutton1">Log In</button>            
          </form>
        </div>
      </div>
    );
  }

export default SignUpCompany;
