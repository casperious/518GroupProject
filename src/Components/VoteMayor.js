import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function VoteMayor(props) {
  const [mayors, setMayors] = useState([]);
  const [selectedMayor, setSelectedMayor] = useState(null);
  const [voted, setVoted] = useState(null);

  useEffect(() => {
    // axios.get('http://localhost:9000/getMayors')
    //           .then((res) => setMayors(res.data))
    //         .catch((err) => alert('Error in Fetching Mayors'))
    // axios.get('http://localhost:9000/getVoted', {"id":id})
    //   .then(((res) => setVoted(res.data)))
    //   .catch((err) => alert('Error in Fetching Votes'))
    setMayors([{ "name": 'A', "id": 1 }, { "name": 'B', "id": 2 }, { "name": 'C', "id": 3 }, { "name": 'D', "id": 4 }]);
  }, []);

  const getMayorName = (id) => {
    const mayor = mayors.find((mayor) => mayor.id == id);
    return mayor ? mayor.name : 'Mayor Name Not Found';
  }

  const handleRadioChange = (event) => {
    setSelectedMayor(event.target.value);
  };

  const onClickHandler = (event) => {
    if (selectedMayor == null) {
      alert('No Mayor Selected');
    } else {
      alert(`You voted for Mayor : ${getMayorName(selectedMayor)}`);
      setVoted({ "id": 323442, "vote": selectedMayor })
      // axios.get('http://localhost:9000/voteMayor', {"id":id,"vote":selectedMayor})
      // .then(((res) => setVoted(res.data)))
      // .catch((err) => alert('Error in Fetching Votes'))
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center lcontainer team-list">
        <h4 style={{ color: 'green' }}>Vote Mayor</h4> <br /> <br />
        {voted != null ? (
          <h4>You have already voted for {getMayorName(voted.vote)}</h4>
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
                {mayors.map((mayor) => (
                  <tr key={mayor.id}>
                    <td>{mayor.name}</td>
                    <td>
                      <input
                        type="radio"
                        value={mayor.id}
                        checked={selectedMayor == mayor.id}
                        onChange={handleRadioChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedMayor != null && (
              <h5>You have selected to vote for: {getMayorName(selectedMayor)}</h5>
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
