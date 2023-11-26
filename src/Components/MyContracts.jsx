import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./footer";

const onDeleteContract = (event, contract, Company_id, setFetchReqs, setFetchContracts) => {
    event.preventDefault()
    console.log(contract)
    if(contract[1] === "Pending") {
        //Delete contract request
        axios.delete("http://localhost:9000/deleteContractRequest", { params: { company_id: Company_id, contract_id: contract[3] }})
        .then((res) => {
            if(res.data) {
                console.log(res.data)
            }
            setFetchReqs(true)
            setFetchContracts(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else if(contract[1] === "Accepted") {
        //Update Contract
        axios.patch("http://localhost:9000/companyUnassignContract", { company_id: Company_id, contract_id: contract[3] })
        .then((res) => {
            if(res.data) {
                console.log(res.data)
            }
            setFetchReqs(true)
            setFetchContracts(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

function MyContracts(props) {
    const Company_id = localStorage.getItem('company_id')
    const [reqs, setReqs] = useState([])
    const [fetchReqs, setFetchReqs] = useState(true)
    const [contracts, setContracts] = useState([])
    const [fetchContracts, setFetchContracts] = useState(true)

    useEffect(() => {
        if(fetchReqs) {
            // Fetch contract details based on the contract ID
            axios.get('http://localhost:9000/getContractRequests')
                .then((res) => {
                    //console.log(res.data);
                    setReqs(res.data)
                   
                })
                .catch((error) => {
                    console.error('Error fetching contract details:', error);
                });
            setFetchReqs(false)
        }
    });

    useEffect(() => {
        if(fetchContracts) {
            // Fetch contract details based on the contract ID
            axios.get(`http://localhost:9000/getContractsAll`)
            .then((res) => {
                //console.log(res.data);
                setContracts(res.data)
                
            })
            .catch((error) => {
                console.error('Error fetching contract details:', error);
            });
            setFetchContracts(false)
        }
    });

    const applied_contracts = reqs.filter((req)=> req.companyId === Company_id)
    console.log(applied_contracts)
    const contract_desc = contracts.filter((c) => {
        return applied_contracts.map((a) => a.contractId).includes(c._id);
    });
    console.log(contract_desc)
    const contract_status = []
    contract_desc.map((c)=>
    {
        console.log(c)
        if(c.companyID===Company_id)
        {
            contract_status.push([c.description,"Accepted", c.budget, c._id])

        }
        else if(c.companyID===null)
        {
            contract_status.push([c.description,"Pending", c.budget, c._id])
        }
        else{
            contract_status.push([c.description,"Declined", c.budget, c._id])
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
                                <h4>Applied Contracts</h4>
    
                                <div>
                                    {
                                        contract_status.map((c, index) => {
                                            const contractAmount = `$${Number(c[2]).toFixed(2)}`
                                            return(<>
                                                <div className="contract-item">
                                                    
                                                    <div className="description">{index+1}. {contract_status[index][0]}</div>
                                                    <div className="status">{contractAmount}</div>
                                                    <div className="status">{contract_status[index][1]}</div>
                                                    <button onClick={(event) => {
                                                        onDeleteContract(event, c, Company_id, setFetchReqs, setFetchContracts)
                                                    }}>Delete</button>
                                                </div>
                                                <br />
                                            </>)
                                            
                                        })
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