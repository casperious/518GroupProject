import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import axios from 'axios'

import Footer from './footer';
import NavBar from './NavBar';

const getHomePageBanner = (mayor) => {
    const mayorText = `Current Mayor: ${mayor.firstName} ${mayor.lastName}`
    return (
        <div>
            <h1 className="display-4">Delegate</h1>
            <p className="lead">{mayorText}</p>
        </div>
    )
}

function Home() {
    const [mayor, setMayor] = useState({})
    const [fetchMayor, setFetchMayor] = useState(true)
    const [electMayor, setElectMayor] = useState(true)

    useEffect(() => {
        if(electMayor) {
            try {
                axios.post("http://localhost:9000/promoteMayor", {})
                .then((res) => {
                    if(res.data) {
                        console.log(res.data)
                        // Mayor is elected now fetch the mayor
                        if(fetchMayor) {
                            try {
                                axios.get("http://localhost:9000/getMayorDetails", {})
                                .then((res) => {
                                    if(res.data) {
                                        console.log(res.data)
                                        setMayor(res.data)
                                    }
                                })
                                setFetchMayor(false)
                            }
                            catch(err) {
                                console.log(err)
                            }
                        }
                    }
                })
            }
            catch(err){
                console.log(err)
            }
            setElectMayor(false)
        }
    })

    return (
        <div>
           <NavBar /> 
            <div className="container-fluid">
                <img src="/images/bg.jpg" alt="banner" className="image"  />
                <div className="jumbotron mt-2 custom-jumbotron text-center banner_content">
                    {getHomePageBanner(mayor)}
                </div>
            

                <div className="row row-style text-center" >
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                            <div className='card-title '><div className="fas fa-exclamation-triangle "> Important Alerts</div></div>
                            
                            <ul className="custom-list">
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                            </ul>
                            <a href="/viewmore" className="text-style">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <img src="/images/alert.jpg" alt="banner" className='row_img'  />
                    </div>
                  
                </div>
                
                <div className="row row-style text-center" >
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                            <div className="card-title"><div class="fa fa-list-alt"> Contracts </div></div>
                            
                            <ul className="custom-list">
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                              </ul>
                              <a href="/viewmore" className="text-style">View more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <img src="/images/contract.jpg" alt="banner" className='row_img'  />
                    </div>
                  
                </div>
                <div className="row row-style text-center" >
                    <div className="col-lg-3">
                        <img src="/images/Law.jpg" alt="banner" className='row_img'  />
                    </div>
                    
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                            <div className="card-title"><div class="fa fa-list-alt"> Latest Laws Passed</div></div>
                            
                            <ul className="custom-list">
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                            </ul>
                            <a href="/viewmore" className="text-style">View more</a>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
            <Footer/>
            
            
        </div>
    );
}

export default Home;


