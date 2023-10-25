import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';


function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">My App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                Citizen
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/voteMayor">Vote Mayor</a></li>
                <li><a class="dropdown-item" href="/viewLaws">Vote Laws</a></li>
                <li><a class="dropdown-item" href="/sendFeedback">Feedback</a></li>
                <li><a class="dropdown-item" href="/sendComplaint">Complaint</a></li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/signup">SignUp</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signUpCompany">Company SignUp</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">LogIn</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
