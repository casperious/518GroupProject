import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import NavBar from './NavBar';
import Footer from './footer';

function ContractRequest() {
    // Define the number of sections, for example, 5 sections
    let n=4;

    const [formOpen, setFormOpen] = useState(Array(n).fill(false));

    const toggleForm = (index) => {
        const updatedFormOpen = [...formOpen];
        updatedFormOpen[index] = !updatedFormOpen[index];
        setFormOpen(updatedFormOpen);
    };

    return (
        <div>
            <NavBar />
            <div className='container'>
                <div className="row row-style text-center">
                    <div className="col-lg-9 offset-1">
                        <div className="card">
                            <div className="card-body">
                                <h4>Contract desc</h4>
                                <div className='card-title '>

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </div>
                                {Array(n).fill(null).map((_, index) => (
                                    <div className='subnav' key={index}>
                                        <h5>Company Name</h5>
                                        <button
                                            type="submit"
                                            className="dislike-button btn btn-primary"
                                            onClick={() => toggleForm(index)}
                                        >
                                            Preview
                                        </button>
                                        {formOpen[index] && (
                                            <div>
                                                <h5>Company Details :</h5>
                                                Company Bidding Amount : $xxxxx <br />
                                                Company Sponsered : True<br/>
                                                <button className='btn btn-success'>Assign</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-style text-center">
                    <div className="col-lg-9 offset-1">
                        <div className="card">
                            <div className="card-body">
                            <h4>Contract desc</h4>
                                <div className='card-title '>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                                </div>
                                {Array(n).fill(null).map((_, index) => (
                                    <div className='subnav' key={index}>
                                        <h5>Company Name</h5>
                                        <button
                                            type="submit"
                                            className="dislike-button btn btn-primary"
                                            onClick={() => toggleForm(index)}
                                        >
                                            Preview
                                        </button>
                                        {formOpen[index] && (
                                            <div>
                                                <h5>Company Details :</h5>
                                                Company Bidding Amount: $xxxxx <br />
                                                Company Sponsored: True
                                                <br />
                                                <button className='btn btn-success'>Assign</button> 
                                            </div>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ContractRequest;
