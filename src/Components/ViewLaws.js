import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

const renderLaw = (law, user_id, setFetchLaws) => {
  // If user hasn't voted on the law already, render the vote buttons
  const role = localStorage.getItem('role');
  const validRole = (role === "Citizen" || role === "Employee") 
  const alreadyVoted = law.vote_history.userID.indexOf(user_id) !== -1
  const lawCardTitle = `(${law.department.name}) ${law.title}`
  if (law.state === "Pending" && validRole && !alreadyVoted) {
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
        <div className="btn-container">
          <button className="like-button btn btn-success" onClick={(event) => {onVoteYay(event, user_id, law, setFetchLaws)}} data-key="YAY" value={law._id}> YAY {law.vote_history.yesCount} </button>
          <button className="dislike-button btn btn-danger" onClick={(event) => {onVoteNay(event, user_id, law, setFetchLaws)}} data-key="NAY" value={law._id}> NAY {law.vote_history.noCount} </button>
        </div><br/>
      </div>
    );
  }
  else if (law.state === "Pending" && validRole && alreadyVoted){
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
          <button 
            className="like-button btn btn-success" 
            onClick={(event) => {onVoteYay(event, user_id, law, setFetchLaws)}} 
            data-key="YAY" 
            value={law._id}
            disabled
            > YAY {law.vote_history.yesCount} </button>
          <button 
            className="dislike-button btn btn-danger" 
            onClick={(event) => {onVoteNay(event, user_id, law, setFetchLaws)}} 
            data-key="NAY" 
            value={law._id}
            disabled
            > NAY {law.vote_history.noCount} </button>
          <p>(Vote Submitted)</p><br/>
      </div>
    );
  }
  else if (law.state === "Pending" && !validRole){
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
          <button 
            className="like-button btn btn-success" 
            onClick={(event) => {onVoteYay(event, user_id, law, setFetchLaws)}} 
            data-key="YAY" 
            value={law._id}
            disabled
            > YAY {law.vote_history.yesCount} </button>
          <button 
            className="dislike-button btn btn-danger" 
            onClick={(event) => {onVoteNay(event, user_id, law, setFetchLaws)}} 
            data-key="NAY" 
            value={law._id}
            disabled
            > NAY {law.vote_history.noCount} </button>
          <p>(Please sign into your Citizen or Employee account to access voting privileges)</p><br/>
      </div>
    );
  }
  else if (law.state === "Active"){
    const msg = `Voting is closed (${law.vote_history.yesCount} YAY - ${law.vote_history.noCount} NAY) Mayor ${law.passedBy}`
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
        <p>{msg}</p><br/>
      </div>
    );
  }
}

const onVoteYay = (event, user_id, law, setFetchLaws) => {
  event.preventDefault();
  axios.patch("http://localhost:9000/addYesVoteForLawVoteId", { user_id: user_id, law_vote: law.vote_history })
  .then((res) => {
      if(res.data) {
          console.log(res.data)
          alert(`Successfully voted YAY on ${law.title}`)
          setFetchLaws(true)
      }
  })
  .catch((err) => {
      console.log(err)
      alert(`Server Error Occured when casting vote`)
  })
}

const onVoteNay = (event, user_id, law, setFetchLaws) => {
  event.preventDefault();
  axios.patch("http://localhost:9000/addNoVoteForLawVoteId", { user_id: user_id, law_vote: law.vote_history })
  .then((res) => {
      if(res.data) {
          console.log(res.data)
          alert(`Successfully voted NAY on ${law.title}`)
          setFetchLaws(true)
      }
  })
  .catch((err) => {
      console.log(err)
      alert(`Server Error Occured when casting vote`)
  })
}

function ViewLaws(props) {

  const [laws, setLaws] = useState([]);
  const [fetchLaws, setFetchLaws] = useState(true);
  let user = localStorage.getItem('user_id');

  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    // Prevent anonymous users to view laws page
    if (!user && !alertShown) {
      alert("Please Login to Vote Laws");
      navigate('/login');
      setAlertShown(true);
    }

    if (fetchLaws) {
      try {
        axios.get("http://localhost:9000/getAllLawsAndVoteHistory", { })
        .then((res) => {
            console.log(res.data)
            setLaws(res.data)
        })
        .catch((err) => {
            console.log(err.response.data);
        })
        setFetchLaws(false);
      }
      catch(err) {
        console.log(err)
      }
    }

  });


  if (!user) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center align-items-center lcontainer">
          <form className="col-6">
            <h2 id="ttle">Laws</h2> <br />
            {laws.map((law) => renderLaw(law, user, setFetchLaws))}
            <br />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewLaws;
