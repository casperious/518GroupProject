import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios, { all } from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";
import Popup from "reactjs-popup";

const SponsorMayoralCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [fetchCandidates, setFetchCandidates] = useState(true);

  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  const company_id = localStorage.getItem('company_id')

  useEffect(() => {
    if(fetchCandidates) {
        axios.get("http://localhost:9000/getCandidates")
          .then((res) => {
            if (res.data) {
              setCandidates(res.data);
            }
          }).catch((err) => {
            console.log(`SERVER ERROR: ${err}`);
          })
        setFetchCandidates(false)
    }
  });

  const onSponsorCandidate = (event) => {
    const cand_id = event.target.value
    axios.patch("http://localhost:9000/sponsorCandidate", { company_id: company_id, candidate_id: cand_id })
    .then((res) => {
        if(res.status == 210) {
            alert("You've Already Sponsored Candidate!")
        }
        else if(res.status == 200 && res.data){
            console.log(res.data)
            alert("Successfully Sponsored Candidate!")
            setFetchCandidates(true)
        }
    })
    .catch((err) => {
        console.log(err)
    })
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center lcontainer team-list">
          <h4 id="ttle">Sponsor Candidate</h4> <br /> <br />
          {
            <>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Policies</th>
                    <th>Sponsor</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => {
                    var sponsorText = 'Sponsors: '
                    for(var i = 0; i < candidate.sponsors.length ; i++) {
                        if(i == 0) {
                          sponsorText = `${sponsorText}${candidate.sponsors[i].name}`
                        }
                        else {
                          sponsorText = `${sponsorText}, ${candidate.sponsors[i].name}`
                        }
                    }
                    return ( 
                    <tr key={candidate._id}>
                      <td>{candidate.firstName} {candidate.lastName}<br></br>{sponsorText}</td>
                      <td><Popup trigger={<button> Policies</button>} position="right center" modal nested>
                        {
                          candidate.policies.map((policy) => (
                            <div>{policy}</div>
                          ))
                        }

                      </Popup></td>
                      <td>
                        <button
                          type="radio"
                          value={candidate._id}
                          onClick={(event) => {
                            console.log(event)
                            event.target.disabled = true
                            onSponsorCandidate(event)
                          }}
                        >Sponsor</button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default SponsorMayoralCandidates;