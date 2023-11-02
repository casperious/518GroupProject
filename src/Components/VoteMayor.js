import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function VoteMayor(props) {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voted, setVoted] = useState(null);

  const [userID, setUserID] = useState([]);
  const [yesCount, setYesCount] = useState([]);

  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
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
    setCandidates([{ "name": 'A', "id": 1 }, { "name": 'B', "id": 2 }, { "name": 'C', "id": 3 }, { "name": 'D', "id": 4 }]);
  }, []);

  const getCandidateName = (id) => {
    const candidate = candidates.find((candidate) => candidate.id == id);
    return candidate ? candidate.name : 'Candidate Name Not Found';
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
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.name}</td>
                    <td>
                      <input
                        type="radio"
                        value={candidate.id}
                        checked={selectedCandidate == candidate.id}
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
  );
}

export default VoteMayor;
