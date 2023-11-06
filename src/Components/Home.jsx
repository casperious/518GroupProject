import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';

import Footer from './footer';
import NavBar from './NavBar';

function Home() {
    return (
        <div>
           <NavBar /> 
            <div className="container-fluid">
                <img src="/images/bg.jpg" alt="banner" className="image"  />
                <div className="jumbotron mt-2 custom-jumbotron text-center banner_content">
                    <h1 className="display-4">Delegate!!!</h1>
                    <p className="lead">Mayor Name</p>
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


