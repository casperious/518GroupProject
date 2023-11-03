import React, {  useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

import NavBar from './NavBar';
import Footer from './footer';
import { Link } from "react-router-dom";

function Department()
{
    const [formOpen, setFormOpen] = useState(false)
    return(
        <div>
            <NavBar/>
            <div className='container-fluid'>
                <div className='container subnav'>
                    <div className="top-left">
                        
                        <h4>Depatment Name: xxxxx</h4>
                        <h4>Available Budget: $xxxxx</h4>
                    </div>
                    <div className="top-right">
                        <button className="btn btn-primary active" onClick={() => setFormOpen(!formOpen)}>PostContract</button>
                        <Link to = "/contractrequest" className="btn btn-primary active">
                           Contract Requests
                        </Link>
                        
                    </div>
                </div>
                {formOpen && <div className = "Container">
                <div className="row row-style text-center">
                    <div className="col-lg-4 offset-4">
                        <h5>Add a Contract</h5>
                        <form className="form">
                        
                            <div className="form-group">
                                <textarea className="form-control" id="UserStory"  placeholder="Enter contract desc" 
                                required/>
                            </div>
                            
                            <div className="form-group">
                                <input type="number" id="Priority" className="form-control" placeholder="Enter budget"  
                                required/> 
                            </div>
                            <div>
                                <button type="submit" className="dislike-button btn btn-warning" onClick={() => setFormOpen(!formOpen)}>Cancel</button>           
                                <button type="submit" className="like-button btn btn-primary" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    }
                <div className="row row-style text-center" >
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                            <div className='card-title '><h5>List of Laws</h5>  </div>
                            
                            <ul className="custom-list">
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                <li className="card-text text-start">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <br/>
                                    <button className="like-button btn btn-success"><i className="fa fa-thumbs-up"></i> Like</button>
                                    <button className="dislike-button btn btn-danger"><i className="fa fa-thumbs-down"></i> Dislike</button>
                                </li>
                                
                            </ul>

                            
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                    <div className="row  text-center" >
                            <div className="card">
                                <div className="card-body">
                                    <div className='card-title '><h5>New Contracts</h5>  </div>
                                    
                                        <ul className="custom-list">
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <a href="/ApplyContract">Apply Here</a></li>

                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <a href="/ApplyContract">Apply Here</a></li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row  text-center" >
                            <div className="card">
                                <div className="card-body">
                                    <div className='card-title '><h5>List of Contracts</h5>  </div>
                                    
                                        <ul className="custom-list">
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row  text-center" >
                            <div className="card">
                                <div className="card-body">
                                    <div className='card-title '><h5>List of Job Vacancies</h5>  </div>
                                    
                                        <ul className="custom-list">
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row  text-center" >
                            <div className="card">
                                <div className="card-body">
                                    <div className='card-title '><h5>Announcements</h5>  </div>
                                    
                                        <ul className="custom-list">
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                            <li className="card-text text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</li>
                                        </ul>
                                </div>
                            </div>
                        </div>
                    </div> 
                        
                        
                </div>
            
            
                <Footer/>
            

            
            </div>
        </div>
    );

}
export default Department;