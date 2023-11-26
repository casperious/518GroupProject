import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import NavBar from './NavBar';
import Footer from './footer';
import axios from 'axios';

function ContractRequest() {
    // Define the number of sections, for example, 5 sections
    const [contracts, setContracts] = useState([]);
    const [contractreqs, setContractreqs] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch company details
        axios.get('http://localhost:9000/getCompanies')
            .then((res) => {
                setCompanies(res.data);
            })
            .catch((error) => {
                console.error('Error fetching company details:', error);
            });

        // Fetch all contracts
        axios.get('http://localhost:9000/getContractsAll')
            .then((res) => {
                setContracts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });

        // Fetch contract requests
        axios.get('http://localhost:9000/getContractRequests')
            .then((res) => {
                setContractreqs(res.data);
            })
            .catch((error) => {
                console.error('Error fetching contract requests:', error);
            });
    }, []);

    const handleSubmit = async (e,company_id,contract_id) =>
    {
        e.preventDefault();
        console.log(company_id,contract_id)
        axios.patch(`http://localhost:9000/assignCompany/${contract_id}`, { companyID: company_id, status: "Assigned" })

        .then((res) => {
            
            alert("Assigned COmpany");
            window.location.reload()
          })
          .catch((error) => {
            alert("Error updating in Assigning:", error);
          });

    }
    console.log(contractreqs)
    console.log(companies)
    

    return (
        <div>
            <NavBar />
            <div className='container'>
                {contracts.map((c) => {
                    if (c.status === "Pending") {
                        return (
                            <div key={c._id} className="row row-style text-center">
                                <div className="col-lg-9 offset-1">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className='card-title '>
                                                
                                                {c.description}
                                            </div>
                                            
                                            <div >
                                                
                                                    {contractreqs.map((cr, index) => {
                                                         
                                                        if (c._id === cr.contractId) {
                                                            const matchingCompany = companies.find((com) => cr.companyId === com._id);

                                                            return (
                                                                <div key={cr._id} >
                                                                    {matchingCompany && (
                                                                        <>
                                                                            <div className='subnav'>
                                                                                <div >{matchingCompany.name}</div> 
                                                                                <div className='top-right'>{cr.bid}
                                                                                
                                                                                <button
                                                                                    type="submit"
                                                                                    className="dislike-button btn btn-primary"
                                                                                    onClick={(e)=>{handleSubmit(e,matchingCompany._id,cr.contractId)}}
                                                                                    
                                                                                >
                                                                                    Assign
                                                                                </button>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            
                                                                          
                                                                        </>
                                                                    )}
                                                                    
                                                                </div>

                                                            );
                                                            
                                                        }
                                                        return null;

                                                       
                                                    })}
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null; // Return null for other cases
                })}
            </div>
            <Footer />
        </div>
    );
    
}

export default ContractRequest;
