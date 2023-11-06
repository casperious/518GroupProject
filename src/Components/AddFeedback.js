import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

function AddFeedback(props) {

    const [feedback, setFeedback] = useState("");
    const [department, setDepartment] = useState(0);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:9000/getDepartments')
        //         .then((res) => setDepartments(res.data))
        //       .catch((err) => alert('Error in Fetching Dep"artments'))
        setDepartments([{"_id":1,"name":"A"},{"_id":2,"name":"B"},{"_id":3,"name":"C"},{"_id":4,"name":"D"}]);
      }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    if(department==0)
    {
      alert("Please select a department")
      return
    }
    if(feedback.trim()=="")
    {
      alert("Please Add Feedback")
      return
    }
    // axios.post('http://localhost:9000/addFeedback',  
    //             {
    //                 user_id : id,
    //                 feedback : feedback,
    //                 department : department
    //             })
    //             .then((res) => {
    //               if(res.data)
    //                   alert('Feedback Sent Successful!')
    //               else
    //                   alert('Unable to send Feedback Try Again')
    //           })
    //           .catch((err) => alert('Error in sending Feedback'))
    setFeedback("");
    setDepartment(0);
		document.getElementById('feedback').value="";
		document.getElementById('department').value=0;
  }

  return (
      
      <div>
        <NavBar />
        <div className="container">
        <div className="row justify-content-center align-items-center lcontainer">
          <form className="col-6">
			      <h2 id="ttle">Feedback</h2> <br/>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select className="form-control" name="department" id="department" onChange={(e) => setDepartment(e.target.value)}>
                <option value={0}>Select a Department</option>
                {departments.map((department) => (
                  <option value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea className="form-control" id="feedback" name="feedback" onChange={(e) => setFeedback(e.target.value)} />
            </div>
            <br/>
            <br/>
            <button type="button" onClick={onClickHandler} className="btn btn-primary">Send Feedback</button>
          </form>
        </div>
        </div>
        <Footer />
      </div>
    );
}

export default AddFeedback;
