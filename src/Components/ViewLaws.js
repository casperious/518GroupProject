import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

function ViewLaws(props) {

  const [laws, setLaws] = useState([]);
  let user = localStorage.getItem('user_id');

  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    setLaws([{ id: 1, description: "dkcbsjkcd", liked: [1, 2, 3], disliked: [] }, { id: 2, description: "sdhvcjhsdvcjhs", liked: [1, 3], disliked: [2] }])
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key');
    if (key == "like") {
      const updatedLaws = laws.map((law) => {
        if (law.id == event.target.value) {
          return { ...law, liked: [...law.liked, 5] };
        }
        return law;
      });
      setLaws(updatedLaws);
    }
    if (key == "dislike") {
      const updatedLaws = laws.map((law) => {
        if (law.id == event.target.value) {
          return { ...law, disliked: [...law.disliked, 5] };
        }
        return law;
      });
      setLaws(updatedLaws);
    }
  }

  useEffect(() => {
    if (!user && !alertShown) {
      alert("Please Login to Vote Laws");
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
        <div className="row justify-content-center align-items-center lcontainer">
          <form className="col-6">
            <h2 id="ttle">Laws</h2> <br />
            {laws.map((law) => (
              <div>
                <h4> {law.description} </h4>
                <div className="btn-container">
                  <button className="btn btn-outline-primary" onClick={onClickHandler} data-key="like" value={law.id}> Like {law.liked.length} </button>
                  <button className="btn btn-outline-danger" onClick={onClickHandler} data-key="dislike" value={law.id}> Dislike {law.disliked.length} </button>
                </div>
              </div>
            ))}
            <br />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewLaws;
