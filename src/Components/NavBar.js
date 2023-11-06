import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../index.css'


function NavBar() {
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
                <li><a class="dropdown-item" href="/Department">Waste Management</a></li>
                <li><a class="dropdown-item" href="/Department">ABC Management</a></li>
                <li><a class="dropdown-item" href="/Department">xyz Management</a></li>
                <li><a class="dropdown-item" href="/Department">123 Management</a></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/signup" style={{color : 'white'}}>SignUp</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signUpCompany" style={{color : 'white'}}>Company SignUp</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login" style={{color : 'white'}}>LogIn</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
