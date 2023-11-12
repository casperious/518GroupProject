import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";

export default function CityDept({ setActive }) {

  let user = localStorage.getItem('user_id');

  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  const [cityValues, setCityValues] = useState({
    department: '',
    employee: '', // Default value
    job: '',
  });

  const handleChange = (event) => {
    setCityValues({ ...cityValues, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add your form submission logic here.
  };

  useEffect(() => {
    if (!user && !alertShown) {
      alert("Please Login to View City Official Departments");
      navigate('/login');
      setAlertShown(true);
    }
  }, [user, alertShown, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Welcome Cityofficial 1</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Departments:</label>
                    <select
                      className="form-control"
                      name="department"
                      value={cityValues.department}
                      onChange={handleChange}
                    >
                      <option value="Department 1">Department 1</option>
                      <option value="Department 2">Department 2</option>
                      <option value="Department 3">Department 3</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Employees</label>
                    <select
                      className="form-control"
                      name="employee"
                      value={cityValues.employee}
                      onChange={handleChange}
                    >
                      <option value="employee1">Employee 1</option>
                      <option value="employee2">Employee 2</option>
                      <option value="employee3">Employee 3</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="job"
                      value={cityValues.job}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
