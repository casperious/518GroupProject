// EmployeeForm.js
import React, { useState } from "react";

function EmployeeForm({ onSubmit }) {
  const [employeeName, setEmployeeName] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = () => {
    if (employeeName.trim() !== "" && jobDescription.trim() !== "") {
      onSubmit({ employeeName, jobDescription });
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center lcontainer">
      <form className="col-6">
      <h2>Hiring New Employee</h2>
      <div className="form-group">
        <label htmlFor="employeeName">Employee Name:</label>
        <input
          type="text"
          className="form-control"
          name="employeeName"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobDescription">Job Description:</label>
        <input
          type="text"
          className="form-control"
          name="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <a href='/HiredEmployee' >
              Complete Employee Selection
            </a>
      </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
