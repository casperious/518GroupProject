import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

const renderLaw = (law, user_id) => {
  // If user hasn't voted on the law already, render the vote buttons
  const lawCardTitle = `(${law.department.name}) ${law.title}`
  if(law.state === "Pending" && (law.vote_history.userID.indexOf(user_id) === -1)) {
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
        <div className="btn-container">
          <button className="btn btn-outline-primary" onClick={(event) => {onVoteYay(event, law)}} data-key="YAY" value={law._id}> YAY {law.vote_history.yesCount} </button>
          <button className="btn btn-outline-danger" onClick={(event) => {onVoteNay(event, law)}} data-key="NAY" value={law._id}> NAY {law.vote_history.noCount} </button>
        </div><br/>
      </div>
    );
  }
  else if (law.state === "Pending" && (law.vote_history.userID.indexOf(user_id) !== -1)){
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
        <p>Vote Submitted</p><br/>
          <button 
            className="btn btn-outline-primary" 
            onClick={(event) => {onVoteYay(event, law)}} 
            data-key="YAY" 
            value={law._id}
            disabled
            > YAY {law.vote_history.yesCount} </button>
          <button 
            className="btn btn-outline-danger" 
            onClick={(event) => {onVoteNay(event, law)}} 
            data-key="NAY" 
            value={law._id}
            disabled
            > NAY {law.vote_history.noCount} </button>
      </div>
    );
  }
  else if (law.state === "Active"){
    return (
      <div>
        <h4>{lawCardTitle}</h4>
        <p>{law.description}</p>
        <p>Voting is closed</p><br/>
      </div>
    );
  }
}

const onVoteYay = (event, law) => {
  // TODO
}

const onVoteNay = (event, law) => {
  // TODO
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

  }, [user, alertShown, navigate]);


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
            {laws.map((law) => renderLaw(law, user))}
            <br />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewLaws;
