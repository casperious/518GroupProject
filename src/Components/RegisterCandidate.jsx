import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

function RegisterCandidate(props) {

    const [policies, setPolicies] = useState([]);
    const user_id = localStorage.getItem("user_id");

    const setPoliciesState = (e) => {
        //console.log(e);
        // const ret = [];
        const ret = e.split('\n');
        //console.log(ret);
        setPolicies(ret);
    }

    const handleSubmit = (e) => {
        console.log("Submitting candidate registration", policies);
        try {
            axios.post("http://localhost:9000/registerCandidate", { userID: user_id, policies: policies, sponsors: [] })
                .then((res) => {
                    //something
                    console.log(res.data)
                    alert(`Candidate Registered Successfully!`)
                })
                .catch((err) => {
                    console.log(`SERVER ERROR: ${err}`);
                    alert(`ERROR: ${err}`)
                })
        }
        catch (err) {
            console.log(`SERVER ERROR: ${err}`);
        }
    };
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center align-items-center lcontainer">
                    <form className="col-6">
                        <h2 id="ttle">Register as Candidate</h2> <br />
                        <div className="form-group">
                            <label htmlFor="userID">User:</label>
                            <label htmlFor="userID">{user_id}</label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="policies">Policies:</label>
                            <textarea className="form-control" id="poliies" name="policies" onChange={(e) => setPoliciesState(e.target.value)} />
                        </div>
                        <br />
                        <br />
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Send Feedback</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterCandidate;
