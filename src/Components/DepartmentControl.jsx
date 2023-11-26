import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";
import { useParams } from "react-router-dom";
function DepartmentControl(props) {

    const { department_id } = useParams();
    const [policies, setPolicies] = useState([]);
    const [name, setName] = useState("");
    const [cityOfficialId, setCityOfficialId] = useState("");
    const [budget, setBudget] = useState("");
    const [rules, setRules] = useState("");
    const [cityOfficials, setCityOfficials] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [createdBy, setCreatedBy] = useState([]);
    const [mayorDetails, setMayorDetails] = useState({});
    const user_id = localStorage.getItem("user_id");
    //console.log(department_id)
    useEffect(() => {
        axios.get('http://localhost:9000/getDepartmentById', {
            params: {
                department_id: department_id,
            }
        })
            .then((res) => {
                //console.log(res.data);
                setName(res.data.name);
                setCityOfficialId(res.data.cityOfficialId);
                setBudget(res.data.budget);
                setRules(res.data.rules);
                setEmployees(res.data.employees);
                setCreatedBy(res.data.createdBy);
            })
            .catch((err) => {
                console.log(`SERVER ERROR: ${err}`);
                alert(`ERROR: ${err}`)
            })
        axios.get("http://localhost:9000/getUnassignedCityOfficials", {
        })
            .then((res) => {
                //something
                //console.log(res.data)
                setCityOfficials(res.data);
                if (cityOfficialId == null) {
                    setCityOfficialId(res.data[0]._id);
                }
                //alert(`City officials saved!`)
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

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleCityOfficial = (e) => {
        console.log(e.target.value);
        setCityOfficialId(e.target.value);
    }
    const handleBudget = (e) => {
        setBudget(e.target.value);
    }
    const handleRules = (e) => {
        setRules(e.target.value);
    }

    const handleSubmit = (e) => {
        console.log("Submitting department changes", cityOfficialId);
        try {
            axios.post("http://localhost:9000/registerDepartment", {
                _id: department_id,
                name: name,
                createdBy: user_id,
                cityOfficialID: cityOfficialId,
                budget: budget,
                rules: rules,
                employees: employees,
            })
                .then((res) => {
                    //something
                    console.log(res.data)
                    alert(`Department Registered Successfully!`)
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
                        <h2 id="ttle">Modify {name}</h2> <br />
                        <div className="form-group">
                            <label htmlFor="userID">Mayor:</label>
                            <label htmlFor="userID">{mayorName}</label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="name">Name:</label><br></br>
                            <input type="text" className="form-control" id="name" name="name" onChange={handleName} value={name} /><br></br>
                            <label htmlFor="city official">City official:</label><br></br>
                            <select onChange={handleCityOfficial}>
                                {
                                    cityOfficials.map((official, index) => {
                                        return <option value={official._id} key={index}>{official.firstName} {official.lastName}</option>
                                    })
                                }
                            </select><br></br>
                            <label htmlFor="budget">Budget:</label><br></br>
                            <input type="Number" className="form-control" id="budget" name="budget" onChange={handleBudget} value={budget} /><br></br>
                            <label htmlFor="policies">Rules:</label><br></br>
                            <input type="text" className="form-control" id="rules" name="rules" onChange={handleRules} value={rules} /><br></br>
                        </div>
                        <br />
                        <br />
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit Department</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DepartmentControl;
