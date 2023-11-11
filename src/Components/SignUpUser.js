import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import '../static/companySignUp.css'
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./footer";

const onSignUp = (event, fName, lName, email, username, pword, setGoToHome) => {
  event.preventDefault();
  try {
    axios.post("http://localhost:9000/createUser", { username: username, password: pword, firstName: fName, lastName: lName, emailId: email, isCityOfficial: "No", isMayor: "No", isEmployee: "No", })
      .then((res) => {
        //something
        console.log(res.data)
        alert(`User Created Successfully!`)
        setGoToHome(true);
      })
      .catch((err) => {
        console.log(`SERVER ERROR: ${err}`);
        alert(`ERROR: ${err}`)
      })
  }
  catch (err) {
    console.log(`SERVER ERROR: ${err}`);
  }
}

const SignUpUser = () => {
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [pword, setPword] = useState("");
  const [goToHome, setGoToHome] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    console.log(goToHome);
    if (goToHome) {
      navigate("/");
    }
  });

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center scontainer">
          <form className="col-6">
            <h2 id="ttle">User SignUp</h2> <br />
            <div className="form-group">
              <label htmlFor="uname">First Name:</label>
              <input type="text" className="form-control" id="uname" onChange={(e) => setFName(e.target.value)} name="username" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="uname">Last Name:</label>
              <input type="text" className="form-control" id="uname" onChange={(e) => setLName(e.target.value)} name="username" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} name="email" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="email">Username:</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setUsername(e.target.value)} name="username" />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="pword">Password:</label>
              <input type="password" className="form-control" id="pword" onChange={(e) => setPword(e.target.value)} name="password" />
            </div>
            <br />
            <button type="button" onClick={(event) => onSignUp(event, fName, lName, email, username, pword, setGoToHome)} className="btn btn-primary sbutton1">Sign Up</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpUser;