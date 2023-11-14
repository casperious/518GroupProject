import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
function Companylogin(){
    const navigate = useNavigate()
    const [email,setName] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault();
        const login = {
          email,
          password
        };
        console.log(login);
        
        try {
            const res = await axios.post('http://localhost:9000/logincompany', login)
        console.log(res.data); // Log the response data
        alert("Login Successful"); 
        const companyId = res.data._id;
        
        localStorage.setItem('company_id', companyId);
        localStorage.setItem("role", "company");
        console.log(localStorage.getItem('company_id'));
        navigate('/')
        }
        catch(err)
         {
        if (err.response) {
            alert(err.response.status + ": " + err.response.data);
        } else {
            alert("An error occurred. Please check your network connection.");
        }
        };
    };
      
    return(
        <div>
            <NavBar />
            <div className="container">
            <div className="row justify-content-center ">
                <div className="col-lg-4 col-lg-offset-4">
                    <div className="panel panel-primary">
                            <br/>
                            <h2 >Company Login</h2>
                            <br /> 
                            <form  className="form">
                                <div className="form-group">
                                    <label><h5>Company Username</h5></label>
                                    <input
                                        type="Email"
                                        value={email}
                                        onChange={(e)=>setName(e.target.value)}
                                        placeholder="Enter Username "
                                        className="form-control"
                                        name="uname"
                                        required
                                    />
                                </div>
                               
                                <div className="form-group">
                                    <label><h5>Password</h5></label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                        className="form-control"
                                        name="pwd"
                                        required
                                    />
                                </div>
                               
                                
                                <button type="submit" className="btn btn-primary button" onClick={handleSubmit}>Submit</button>
                                
                            </form>
                       
                            
                        
                        
                    </div>
                </div>    
            </div>
            </div>
            <Footer/>
        </div>
    )
    
}

export default Companylogin;