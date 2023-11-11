import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios, { all } from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

function VoteMayor(props) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [voted, setVoted] = useState(null);

  const [userID, setUserID] = useState([]);
  const [yesCount, setYesCount] = useState([]);
  const [users, setUsers] = useState([]);

  const user_id = localStorage.getItem("user_id");
  //const allNames = [];
  useEffect(() => {
    axios.get("http://localhost:9000/getCandidates")
      .then((res) => {
        if (res.data) {
          setCandidates(res.data);
          //console.log(res.data);
          const candidateUsers = [];
          for (const cand of res.data) {
            axios.get("http://localhost:9000/getUserById", {
              params: {
                _id: cand.userID,
              }
            })
              .then((res) => {
                if (res.data) {
                  //console.log(res.data.firstName);
                  cand.firstName = res.data.firstName;
                  candidateUsers.push(res.data);
                }
                else {
                  alert("Name not found");
                }
              })
          }
          //console.log(candidateNames);
          setUsers(candidateUsers);
        }
      }).catch((err) => {
        console.log(`SERVER ERROR: ${err}`);
        //alert(`ERROR: ${err}`)
      })
    /*axios.get('http://localhost:9000/getMayorVotes')
      .then((res) => {
        if(res.data){
        setCandidates(res.data.candidates);
        setUserID(res.data.userID);
        setYesCount(res.data.yesCount);
        }
        else
        {
          alert("Fetching mayorVotes table failed");
        }
      })
      .catch((err) => alert('Error in Fetching Candidates'))
    */
    //setCandidates([{ "name": 'A', "id": 1 }, { "name": 'B', "id": 2 }, { "name": 'C', "id": 3 }, { "name": 'D', "id": 4 }]);
  }, []);
  //console.log(names);
  const getCandidateName = (id) => {
    const candidate = candidates.find((candidate) => candidate._id == id);
    return candidate ? candidate.firstName : 'Candidate Name Not Found';
  }

  const handleRadioChange = (event) => {
    setSelectedCandidate(event.target.value);
  };

  const onClickHandler = (event) => {
    if (selectedCandidate == null) {
      alert('No Candidate Selected');
    } else {
      alert(`You voted for Mayor : ${getCandidateName(selectedCandidate)}`);
      setVoted({ "id": user_id, "vote": selectedCandidate })
      /*let votes = [...yesCount];
      let vote = votes[selectedCandidate];
      vote += 1;
      votes[selectedCandidate] = vote;
      setYesCount(votes);
      axios.post('https://localhost:9000/voteMayor', {
        "userID": [...userId, user_id],
        "candidateID": candidates,
        "yesCount": yesCount,
      })*/
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center lcontainer team-list">
          <h4 style={{ color: 'green' }}>Vote Mayor</h4> <br /> <br />
          {voted != null ? (
            <h4>You have already voted for {getCandidateName(voted.vote)}</h4>
          ) : (
            <>
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Vote</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.length > 0 && candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td>{candidate.firstName}</td>
                      <td>
                        <input
                          type="radio"
                          value={candidate._id}
                          checked={selectedCandidate == candidate._id}
                          onChange={handleRadioChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedCandidate != null && (
                <h5>You have selected to vote for: {getCandidateName(selectedCandidate)}</h5>
              )}
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
