import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";


function MyContracts(props) {
    const Company_id = localStorage.getItem('company_id')
    const [reqs, setReqs] = useState([])
    const [contracts, setContracts] = useState([])
    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get('http://localhost:9000/getContractRequests')
            .then((res) => {
                console.log(res.data);
                setReqs(res.data)
               
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    useEffect(() => {
        // Fetch contract details based on the contract ID
        axios.get(`http://localhost:9000/getContractsAll`)
            .then((res) => {
                console.log(res.data);
                setContracts(res.data)
                
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
    }, []);
    const applied_contracts = reqs.filter((req)=> req.companyId === Company_id)
    console.log(applied_contracts)
    const contract_desc = contracts.filter((c) => {
        return applied_contracts.map((a) => a.contractId).includes(c._id);
    });
    console.log(contract_desc)
    const contract_status = []
    contract_desc.map((c)=>
    {
        console.log(c.companyID)
        if(c.companyID===Company_id)
        {
            contract_status.push([c.description,"Accepted"])

        }
        else if(c.companyID===null)
        {
            contract_status.push([c.description,"Pending"])
        }
        else{
            contract_status.push([c.description,"Declined"])
        }
    })
    console.log(contract_status)

    return (
        <div>
            <NavBar />
    
            <div className='container'>
                <div className="row row-style">
                    <div className="col-lg-9 offset-1">
                        <div className="card">
                            <div className="card-body ">
                                <h4 > Applied Contrats</h4>
    
                                <div>
                                    {
                                        contract_status.map((c, index) => (
                                            <>
                                                <div className="contract-item">
                                                    
                                                    <div className="description">{index+1}. {contract_status[index][0]}</div>
                                                    <div className="status">{contract_status[index][1]}</div>
                                                </div>
                                                <br />
                                            </>
                                            
                                        ))
                                    }
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
  
export default MyContracts;