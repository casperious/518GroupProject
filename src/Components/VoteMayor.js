import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios, { all } from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";
import Popup from "reactjs-popup";

function VoteMayor(props) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voted, setVoted] = useState("No");
  const [userID, setUserID] = useState([]);
  const [yesCount, setYesCount] = useState([]);
  let user = localStorage.getItem('user_id');

  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    axios.get("http://localhost:9000/getCandidates")
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setCandidates(res.data);
        }
      }).catch((err) => {
        console.log(`SERVER ERROR: ${err}`);
      })
    axios.get('http://localhost:9000/getMayorVotes')
      .then((res) => {
        if (res.data) {

          setUserID(res.data[0].userID);
          setYesCount(res.data[0].yesCount);
          if (res.data[0].userID.includes(user_id)) {
            setVoted("Yes");
            setSelectedCandidate()
          }
        }
        else {
          alert("Fetching mayorVotes table failed");
        }
      })
      .catch((err) => {
        console.log(`SERVER ERROR: ${err}`);
      })

  }, []);


  const handleRadioChange = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const onClickHandler = (event) => {
    if (selectedCandidate == null) {
      alert('No Candidate Selected');
    } else {
      const cand = candidates.find((candidate) => candidate._id == selectedCandidate);
      alert(`You voted for Mayor : ${cand.firstName} ${cand.lastName}`);
      setVoted({ "id": user_id, "vote": selectedCandidate })
      let votes = yesCount.find((vote) => vote.candidateId == cand._id);
      let vote = 0;
      if (votes == null) {
        vote = 0;
        votes = new Object({
          candidateId: cand._id,
          votes: 0,
        })
      }
      else {
        vote = votes.votes;
      }
      vote = vote + 1;
      var index = yesCount.indexOf(votes);
      const updatedVote = new Object({
        candidateId: votes.candidateId,
        votes: vote,
      })
      let yesses = [...yesCount];
      if (yesCount.length == 0) {
        yesses = [vote];
        index = 0;
      }

      yesses[index] = updatedVote;
      const users = userID;
      users.push(user_id);
      console.log(yesses);
      axios.post("http://localhost:9000/postMayorVotes", { userID: users, candidateID: candidates, yesCount: yesses })
        .then((res) => {
          //something
          //console.log(res.data)
          alert(`Vote Submitted Successfully!`)

        })
        .catch((err) => {
          console.log(`SERVER ERROR: ${err}`);
          alert(`ERROR: ${err}`)
        })
    }
  };

  useEffect(() => {
    if (!user && !alertShown) {
      alert("Please Login to Vote Mayor");
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
        <div className="row justify-content-center align-items-center lcontainer team-list">
          <h4 id="ttle">Vote Mayor</h4> <br /> <br />
          {voted != "No" ? (
            <>
              <h4>You have already voted</h4>
              <h5>Candidates and Policies</h5>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Policies</th>
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
                      <td><Popup trigger={<button> Policies</button>} overlayStyle={{ backgroundColor: '#F8F8F8',
                              border: '1px solid #DADADA',
                              width: '500px',
                              height: '300px',
                              margin: 'auto',
                              marginBottom: '50px' }} position="right center" modal nested>
                        {
                          candidate.policies.map((policy) => (
                            <div>{policy}</div>
                          ))
                        }
                      </Popup></td>
                    </tr>)
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Policies</th>
                    <th>Vote</th>
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
                      <td><Popup trigger={<button> Policies</button>} overlayStyle={{ backgroundColor: '#F8F8F8',
                              border: '1px solid #DADADA',
                              width: '500px',
                              height: '300px',
                              margin: 'auto',
                              marginBottom: '50px' }} position="right center" modal nested>
                        {
                          candidate.policies.map((policy) => (
                            <div>{policy}</div>
                          ))
                        }

                      </Popup></td>
                      <td>
                        <input
                          type="radio"
                          value={candidate._id}
                          checked={selectedCandidate == candidate._id}
                          onChange={handleRadioChange}
                        />
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>

              <button type="button" onClick={onClickHandler} className="btn btn-outline-primary">
                Vote
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default VoteMayor;
