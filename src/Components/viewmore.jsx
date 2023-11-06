import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import NavBar from './NavBar';
import Footer from './footer';

function ViewMore() {
    return (
        <div>
             
                <NavBar />
                <div className="row row-style text-center" >
                    <div className="col-lg-8 offset-2">
                        <div className="card">
                            <div className="card-body">
                            <h4 className='card-title '>Title</h4>
                            
                            <ul className="custom-list">
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br />
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br/>
                                <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li><br />
                            </ul>
                            
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    );
}

export default ViewMore;


