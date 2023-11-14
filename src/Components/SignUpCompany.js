import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import '../static/companySignUp.css'
import { Link, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./footer";

const SignUpCompany = () => {

    
	  const [pword, setPword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    
    
    const navigate = useNavigate();

    
    useEffect(() => {
        //axios.get('http://localhost:9000/getDepartments')
                //.then((res) => setDepartments(res.data))
              //.catch((err) => alert('Error in Fetching Departments'))
      }, []);



	const onClickHandler = (event) => {
    event.preventDefault();
    const company = {
                "password" : pword,
                 "email" : email,
                 "name" : name,
                
               
    }
    console.log(company);
    axios.post('http://localhost:9000/createCompany', company)
        .then((res) => alert('Company SignUp successful, Now you can Login!!!'))
        .catch((err) => {
          console.error('Error in Signing Up:', err);
          alert('Error in Signing Up! Check the console for more details.');
  });
    
    
  }

  // const onClickLogInHandler = (event) => {
  //   event.preventDefault();
    
  //   setPword("");
  //   setEmail("");
  //   setName("");
  //   setUsers("");
  //   document.getElementById('uname').value="";
  //   document.getElementById('pword').value="";
  //   document.getElementById('email').value="";
  //   document.getElementById('name').value="";
  //   document.getElementById('department').value="";
  //   navigate('/login');
  // }

    return (
      <div>
        <NavBar />
        <div className="container">
        <div className="row justify-content-center align-items-center scontainer">
          <form className="col-6">
			      <h2 id="ttle">Company SignUp</h2> <br/>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} name="name" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} name="email" />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="pword">Password:</label>
              <input type="password" className="form-control" id="pword" onChange={(e) => setPword(e.target.value)} name="password" />
            </div>
            <br/>
            
            <button type="button" onClick={onClickHandler} className="btn btn-primary sbutton1">Sign Up</button>
            <Link to="/Companylogin">Login Here </Link>          
          </form>
        </div>
        </div>
        <Footer />
      </div>
    );
  }

export default SignUpCompany;
