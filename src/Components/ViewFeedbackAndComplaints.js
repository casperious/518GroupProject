import { useEffect, useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
//import backgroundImage from './background.jpg';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function ViewFeedbackAndComplaints() {
    const [feedback, setFeedback] = useState([]);
    const [fetchFeedback, setFetchFeedback] = useState(true)
    const [complaints, setComplaints] = useState([]);
    const [fetchComplaints, setFetchComplaints] = useState(true)
    const [user, setUser] = useState({})
    const [department, setDepartment] = useState({})
    const [fetchTitleInfo, setFetchTitleInfo] = useState(true)
    const [deptName, setDeptName] = useState('')
    const [userName, setUserName] = useState('')

    let user_id = localStorage.getItem('user_id');
    var user_name = ''
    var dept_name = ''

    useEffect(() => {
        if(fetchFeedback) {
            try {
                axios.get("http://localhost:9000/getFeedback", { params: { user_id: user_id } })
                .then((res) => {
                    if(res.data) {
                        console.log(res.data)
                        setFeedback(res.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            catch (err) {
                console.log(err)
            }
            setFetchFeedback(false)
        }
        if(fetchComplaints) {
            try {
                axios.get("http://localhost:9000/getComplaints", { params: { user_id: user_id } })
                .then((res) => {
                    if(res.data) {
                        console.log("complaints")
                        console.log(res.data)
                        setComplaints(res.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            }
            catch (err) {
                console.log(err)
            }
            setFetchComplaints(false)
        }
        if(fetchTitleInfo) {
            try {
                //Get User
                axios.get("http://localhost:9000/getUserById", { params: { _id: user_id } })
                .then((res) => {
                    if(res.data) {
                        console.log("USER:")
                        setUser(res.data)
                        //Get Department
                        axios.get("http://localhost:9000/getDepartmentByUserID", { params: { user_id: user_id } })
                        .then((res2) => {
                            if(res2.data) {
                                console.log("DEPT:")
                                setDepartment(res2.data)
                                //Set user Name and Department Name
                                setUserName(`${res.data.firstName} ${res.data.lastName}`)
                                setDeptName(`${res2.data.name}`)
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            catch (err) {
                console.log(err)
            }
            setFetchTitleInfo(false)
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <img src="/images/monopoly.png" alt="banner" className="image" />
                <div className="jumbotron mt-2 custom-jumbotron text-center banner_content">
                    <h1 className="display-4">{deptName}</h1>
                    <p className="lead">{userName}</p>
                </div>


                <div className="row row-style text-center" >
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <div className='card-title '><div className="fas fa-exclamation-triangle ">Feedback</div></div>

                                <ul className="custom-list">
                                    {
                                        feedback.map((submission, index) => {
                                            const feedString = `${submission.user}: ${submission.feedback}`
                                            return (
                                                <li className="card-text text-start" id={submission._id}>{feedString}</li>
                                            );
                                        })
                                    }
                                </ul>
                                <a href="/viewmore" className="text-style">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <img src="/images/alert.jpg" alt="banner" className='row_img' />
                    </div>

                </div>

                <div className="row row-style text-center" >
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title"><div class="fa fa-list-alt">Complaints</div></div>

                                <ul className="custom-list">
                                    {
                                        complaints.map((complaint, index) => {
                                            const complaintString = `${complaint.user}: ${complaint.complaint}`
                                            return (
                                                <li className="card-text text-start" id={complaint._id}>{complaintString}</li>
                                            );
                                    })
                                    }
                                </ul>
                                <a href="/viewmore" className="text-style">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <img src="/images/contract.jpg" alt="banner" className='row_img' />
                    </div>

                </div>

            </div>
            <Footer />


        </div>
    );
}

export default ViewFeedbackAndComplaints;