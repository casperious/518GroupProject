import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";

export default function CityDept({  }) {
  const [cityValues, setCityValues] = useState({
    dept_id: '',
    emp_id: '', 
    jobDescription: '',
  });

  const [userData, setUserData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);

  

  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setCityValues({ ...cityValues, [name]: value });
   };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:9000/createEmployee', cityValues)
    .then((res) => {
      
      if (res.data) {
        alert('Employee added successfully');
        
      }
    })
    .catch((err) => {
      alert('Error in adding employee');
      
      
    });
  };

  useEffect(() =>{
    
    axios
    .get('http://localhost:9000/getEmployee')
    .then(function(response){
      
      const allEmployee = response.data;
      
      setCityValues(allEmployee);
      
      setSubmittedData(allEmployee);
    })
    .catch(function(error){
      console.log(error);
    });
   
    axios.get('http://localhost:9000/getUsers')
    .then(function(response){
      const userData = response.data;
      
      setUserData(userData);
    })
    .catch(function(error){
      console.log(error);
    }
    )
    axios.get('http://localhost:9000/getDepartments')
    .then(function(response){
      const alldept = response.data;
      setDeptData(alldept);
    })
    .catch(function(error){
      console.log(error);
    }
    )

  }, []
    
  );



  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Welcome Cityofficial</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Departments:</label>
                    <select
                      className="form-control"
                      name="dept_id"
                      value={cityValues.dept_id}
                      onChange={handleInputChange}
                    >
                      <option value ="">Select a department </option>
                    {deptData.map((departments) => (
                      <option key={departments._id} value = {departments._id}>{departments.name}</option>

                    ))
                    }
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Employees</label>
                    <select
                      className="form-control"
                      name="emp_id"
                      value={cityValues.emp_id}
                      onChange={handleInputChange}
                    >
                      

                    <option value="">Select employee </option>
                          {userData.map((user) => {
                              
                              if (!user.isCityOfficials && !user.isMayor) {
                          return (
                              <option key={user._id} value={user._id}>
                              {user.firstName} {user.lastName}
                    </option>
                );
               } else {
              
              return null;
              }
            })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Job Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="jobDescription"
                      value={cityValues.jobDescription}
                      onChange={handleInputChange}
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
