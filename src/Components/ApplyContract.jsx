import React, {  useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './NavBar';
import Footer from './footer';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function ApplyContract()
{
    const { contractId } = useParams();
    const [contracts, setContracts] = useState([]);
    const navigate = useNavigate();
    const [desc, setDesc] = useState("");
    const [bidding, setBidding] = useState(0)
    console.log(contractId)
    const getContractById = (contracts, contractId) => {
        return contracts.find(contract => (contract._id) === contractId);
        
    };

    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get(`http://localhost:9000/getContractsAll`)
            .then((res) => {
                console.log(res.data);
                setContracts(res.data)
                const contract = getContractById(res.data, contractId);
                console.log(contract)
                if (contract) {
                    setDesc(contract.description);
                } else {
                    console.error(`Contract with ID ${contractId} not found.`);
                }
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    
    // console.log(applied+"**")
    const handlesubmit = async (event) =>
    {
        event.preventDefault()
        const contractreq = 
        {
            companyId : localStorage.getItem('company_id'),
            contractId : contractId,
            bid : bidding
        }
        axios.post("http://localhost:9000/contractRequest",contractreq)
        .then((res) =>
        {
            console.log(res.data)
            alert("Applied successfully")
            navigate("/Department")
        }
        )
        .catch((error) => {
            console.log(error);
            alert(error.response.data)
        })

    }

    return(
        <div>
            <NavBar/>
            <div className="row row-style text-center">
                <div className="col-lg-4 offset-4">
                    <h5>Apply for a Contract</h5>
                    <br/>
                    <form className="form">
                    
                        <div className="form-group">
                         <h6>Contract DESC : {desc}</h6> 
                         
                         
                        </div>
                        
                        <div className="form-group">
                            <input type="number" id="bid" className="form-control" placeholder="Enter bidding Amount"  onChange={(event) => {
                                    var amt = Number(event.target.value)
                                    amt = amt.toFixed(2)
                                    setBidding(amt)
                                }}
                            required/> 
                        </div>
                        <div>
                        <button className="btn btn-primary" onClick={handlesubmit}>Submit</button>             
                            
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ApplyContract