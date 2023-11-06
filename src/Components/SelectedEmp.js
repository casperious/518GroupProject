
import React from "react";
import NavBar from "./NavBar";
import Footer from "./footer";

function SubmissionPage() {
    return (
      <div>
      <NavBar />
      <div className="container">
          <div className="row justify-content-center align-items-center lcontainer">
            <form className="col-6">
              <h2>Hired Employee information</h2>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>City Official:</strong></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><strong>Department:</strong></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><strong>Employee Name:</strong></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><strong>Job Description:</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          </div>
          <Footer />
        </div>
      );
    }

export default SubmissionPage;
