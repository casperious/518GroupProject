import React, { Component } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

function CreatePost(props) {

    const [post, setPost] = useState("");

    useEffect(() => {

    }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    if(post.trim()=="")
    {
      alert("Please add text to post")
      return
    }
    // axios.post('http://localhost:9000/createPost',  
    //             {
    //                 user_id : id,
    //                 post : post
    //             })
    //             .then((res) => {
    //               if(res.data)
    //                   alert('Post Created Successful!')
    //               else
    //                   alert('Unable to Create Post Try Again')
    //           })
    //           .catch((err) => alert('Error in Creating Post'))
    setPost("");
		document.getElementById('post').value="";
  }

  return (
      <div className="container">
        <div className="row justify-content-center align-items-center lcontainer">
          <form className="col-6">
			      <h2 id="ttle">Post</h2> <br/>
            <div className="form-group">
              <label htmlFor="post">Post:</label>
              <textarea className="form-control" id="post" name="post" onChange={(e) => setPost(e.target.value)} />
            </div>
            <br/>
            <button type="button" onClick={onClickHandler} className="btn btn-primary">Create Post</button>
          </form>
        </div>
      </div>
    );
}

export default CreatePost;
