import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import NavBar from './NavBar';
import Footer from './footer';
import axios from 'axios';

function ContractRequest() {
    // Define the number of sections, for example, 5 sections
    const [contracts, setContracts] = useState([])
    const [contractreqs, setContractreqs] = useState([])
    const [companies, setCompanies] = useState([])
    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get('http://localhost:9000/getCompanies')
            .then((res) => {
                setCompanies(res.data)
                
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get('http://localhost:9000/getContractsAll')
            .then((res) => {
                setContracts(res.data)
                
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get('http://localhost:9000/getContractreqs')
            .then((res) => {
                setContractreqs(res.data)
                
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    console.log("***",companies)
    console.log("***",contractreqs)
    console.log("****",contracts)
    
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

                                   
                                </div>
                                
                                    <div className='subnav' >
                                        <h5> </h5>
                                        
                                        <button
                                            type="submit"
                                            className="dislike-button btn btn-primary"
                                            
                                        >
                                            Assign
                                        </button>
                                        
                                    </div>
                               
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
                                </div>
                                
                                    <div className='subnav' >
                                        <h5>Company Name</h5>
                                        <button
                                            type="submit"
                                            className="dislike-button btn btn-primary"
                                            
                                        >
                                           Assign
                                        </button>
                                        
                                    </div>
                               

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
