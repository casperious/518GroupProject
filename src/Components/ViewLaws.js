import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function ViewLaws(props) {

    const [laws, setLaws] = useState([]);

    useEffect(() => {
      setLaws([{id:1,description:"dkcbsjkcd",liked:[1,2,3],disliked:[]},{id:2,description:"sdhvcjhsdvcjhs",liked:[1,3],disliked:[2]}])
    }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key');
    if(key=="like")
    {
      const updatedLaws = laws.map((law) => {
        if (law.id == event.target.value) {
          return { ...law, liked: [...law.liked, 5] };
        }
        return law;
      });
      setLaws(updatedLaws);
    }
    if(key=="dislike")
    {
      const updatedLaws = laws.map((law) => {
        if (law.id == event.target.value) {
          return { ...law, disliked: [...law.disliked, 5] };
        }
        return law;
      });
      setLaws(updatedLaws);
    }
  }

  return (
      <div className="container">
        <div className="row justify-content-center align-items-center lcontainer">
          <form className="col-6">
			      <h2 id="ttle">Laws</h2> <br/>
            {laws.map((law) => (
              <div>
                <h4> {law.description} </h4>
                <div className="btn-container">
                  <button className="btn btn-outline-primary" onClick={onClickHandler} data-key="like" value={law.id}> Like {law.liked.length} </button>
                  <button className="btn btn-outline-danger" onClick={onClickHandler} data-key="dislike" value={law.id}> Dislike {law.disliked.length} </button>
                </div>
              </div>
            ))}
            <br/>
          </form>
        </div>
      </div>
    );
}

export default ViewLaws;
