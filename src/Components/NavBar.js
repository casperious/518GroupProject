import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../index.css'
import axios from 'axios'

const getLoginOptions = () => {
  //localStorage.getItem("user_id")
  //if there is no current User logged in to the system, render in all the login/create account options
  if(Object.is(localStorage.getItem("user_id"), null)) {
    return (
        <ul className="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/signup" style={{color : 'white'}}>SignUp</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signUpCompany" style={{color : 'white'}}>Company SignUp</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login" style={{color : 'white'}}>Login</a>
          </li>
        </ul>
    );
  }
  // Else render the log out option
  else {
    return (
      <ul className="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/" style={{color : 'white'}} onClick={() => {
            localStorage.removeItem("user_id");
          }}>Logout</a>
        </li>
      </ul>
    )
  }
}

function NavBar() {
  //PLEASE READ: This is super ugly. I don't know how to do this properly. When you select a Department from the department drop down
  // You just go to /Department... I want to be able to do /Department/DepartmentID so that you load in details for the department
  // Identified by DepartmentID. Need to find a way either using navigate() or some other method to append parameters to the departments
  // Page so that we can load in the correct data.
  // ...
  // CURRENT WORK AROUND: Set the department in localStorage as "currentDepartment" and JSON.stringify() the department Object
  // using the onClick() event in the <a></a> child element of the listItem <li></li> element. 
  const [departments, setDepartments] = useState([]);
  const [fetchDepartments, setFetchDepartments] = useState([true])

  useEffect(() => {
    if(fetchDepartments) {
      //axios
      axios.get("http://localhost:9000/getDepartments", { params: {}})
        .then((res) => {
          //something
          setDepartments(res.data)
          setFetchDepartments(false);
        })
        .catch((err) => {
          console.log(`SERVER ERROR: ${err}`);
          alert(`ERROR: ${err}`)
        })
    }
  }, []);


  return (
    <nav className="navbar navbar-expand-lg light-pink-bg ">
      <div class="container-fluid">
        <a class="navbar-brand" href="/" style={{color : 'white'}}>Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true" style={{color : 'white'}}>
                Citizen
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/voteMayor" >Vote Mayor</a></li>
                <li><a class="dropdown-item" href="/viewLaws" >Vote Laws</a></li>
                <li><a class="dropdown-item" href="/sendFeedback" >Feedback</a></li>
                <li><a class="dropdown-item" href="/sendComplaint" >Complaint</a></li>
                <li><a class="dropdown-item" href="/Cityofficialsdepartments" >Cityofficials'departments</a></li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav   mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true" style={{color : 'white'}}>
                Departments
              </a>
              <ul class="dropdown-menu">
                {
                  departments.map((department) => {
                    return <li><a class="dropdown-item" href="/Department" onClick={(event) => {
                      localStorage.removeItem('currentDepartment')
                      localStorage.setItem('currentDepartment', JSON.stringify(department))
                    }}>{department.name}</a></li>;
                  })
                }
              </ul>
            </li>
          </ul>
          <>
            {
              getLoginOptions()
            }
          </>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
