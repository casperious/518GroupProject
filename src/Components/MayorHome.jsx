import { useEffect, useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
//import backgroundImage from './background.jpg';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

function MayorHome() {
    const [laws, setLaws] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [details, setDetails] = useState({});
    let user = localStorage.getItem('user_id');
    useEffect(() => {
        axios.get('http://localhost:9000/getLawsForMayor')
            .then((res) => {
                if (res.data) {
                    setLaws(res.data);
                    //setDepartments(res.data);
                    //successMessage();
                }
                else
                    alert("No Departments");
            })
            .catch((err) => alert("Error in fetching laws passed by mayor"));
        axios.get('http://localhost:9000/getMayorSponsors')
            .then((res) => {
                if (res.data) {
                    setSponsors(res.data);
                }
                else
                    alert("No sponsors");
            })
            .catch((err) => alert("Error in fetching mayor sponsors"));
        axios.get('http://localhost:9000/getMayorDetails')
            .then((res) => {
                if (res.data) {
                    setDetails(res.data);
                }
                else
                    alert("No details");
            })
            .catch((err) => alert("Error in fetching mayor details"));
    }, []);
    return (
        <div>
            <NavBar />
            <div className="container-fluid">
                <img src="/images/monopoly.png" alt="banner" className="image" />
                <div className="jumbotron mt-2 custom-jumbotron text-center banner_content">
                    <h1 className="display-4">Mayor</h1>
                    <p className="lead">{details.firstName} {details.lastName}</p>
                </div>


                <div className="row row-style text-center" >
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <div className='card-title '><div className="fas fa-exclamation-triangle "> Laws Passed</div></div>

                                <ul className="custom-list">
                                    {
                                        laws.map((law, index) => (
                                            <li className="card-text text-start" id={law._id}>{law.title}</li>
                                        ))
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
                                <div className="card-title"><div class="fa fa-list-alt"> Sponsors </div></div>

                                <ul className="custom-list">
                                    {
                                        sponsors.map((sponsor, index) => (
                                            <li className="card-text text-start" id={sponsor._id}>{sponsor.name}</li>
                                        ))
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

export default MayorHome;


