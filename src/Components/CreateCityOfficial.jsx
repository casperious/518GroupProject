import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

function CreateCityOfficial(props) {

    const [userId, setUserId] = useState("");
    const [dateAppointed, setDateAppointed] = useState("");
    const [endDate, setEndDate] = useState("");
    const [users, setUsers] = useState([]);
    const [mayorDetails, setMayorDetails] = useState({});
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        axios.get("http://localhost:9000/getUsers", {
        })
            .then((res) => {
                //something
                console.log(res.data)
                setUsers(res.data);
                console.log(`users saved!`);
            })
            .catch((err) => {
                console.log(`SERVER ERROR: ${err}`);
                alert(`ERROR: ${err}`)
            })
        
        axios.get('http://localhost:9000/getMayorDetails')
        .then((res) => {
            if (res.data) {
                setMayorDetails(res.data);
                console.log(res.data)
            }
            else
                alert("No details");
        })
        .catch((err) => alert("Error in fetching mayor details"));
    }, []);

    const handleUserId = (e) => {
        setUserId(e.target.value);
    }

    const handleDateAppointed = (e) => {
        setDateAppointed(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }


    const handleSubmit = (e) => {
        console.log("Submitting city official registration", userId, dateAppointed, endDate, " ");
        try {
            axios.post("http://localhost:9000/registerCityOfficial", {
                userId: userId,
                dateAppointed: dateAppointed,
                endDate: endDate,
                departmentID: null,
            })
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
    const mayorName = `${mayorDetails.firstName} ${mayorDetails.lastName}`
    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="row justify-content-center align-items-center lcontainer">
                    <form className="col-6">
                        <h2 id="ttle">Create City Official</h2> <br />
                        <div className="form-group">
                            <label htmlFor="userID">Mayor:</label>
                            <label htmlFor="userID">{mayorName}</label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="policies">User to promote:</label><br>
                            </br>
                            <select onChange={handleUserId}>
                                {
                                    users.map((user, index) => {
                                        return <option value={user._id} key={index}>{user.firstName}</option>
                                    })
                                }
                            </select>
                            <br></br>
                            <label htmlFor="policies">Start Date:</label>
                            <input type="date" className="form-control" id="startDate" name="startDate" onChange={handleDateAppointed} />
                            <br></br>
                            <label htmlFor="policies">End Date:</label>
                            <input type="date" className="form-control" id="startDate" name="startDate" onChange={handleEndDate} />
                        </div>
                        <br />
                        <br />
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit City Official</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CreateCityOfficial;
