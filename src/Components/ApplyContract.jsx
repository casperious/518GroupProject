import React, {  useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './NavBar';
import Footer from './footer';
import { Link } from "react-router-dom";
function ApplyContract()
{
    return(
        <div>
            <NavBar/>
            <div className="row row-style text-center">
                <div className="col-lg-4 offset-4">
                    <h5>Apply for a Contract</h5>
                    <form className="form">
                    
                        <div className="form-group">
                        <select
                            className="form-control"
                            name="contract"
                            id="contract"
                        >
                            <option value="">Select a Contract</option>
                            
                            <option>contract9</option>
                            <option>contract6</option>
                            <option>contract3</option>
                            <option>contract2</option>
                            
                        </select>
                        </div>
                        
                        <div className="form-group">
                            <input type="number" id="bid" className="form-control" placeholder="Enter bidding Amount"  
                            required/> 
                        </div>
                        <div>
                                       
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default ApplyContract