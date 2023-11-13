import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import Footer from "./footer";
import axios from 'axios';

const onVoteYay = (event, user_id, law, setFetchLaws) => {
    event.preventDefault();
    axios.patch("http://localhost:9000/addYesVoteForLawVoteId", { user_id: user_id, law_vote: law.vote_history })
    .then((res) => {
        if(res.data) {
            console.log(res.data)
            alert(`Successfully voted YAY on ${law.title}`)
            setFetchLaws(true)
        }
    })
    .catch((err) => {
        console.log(err)
        alert(`Server Error Occured when casting vote`)
    })
}

const onVoteNay = (event, user_id, law, setFetchLaws) => {
    event.preventDefault();
    axios.patch("http://localhost:9000/addNoVoteForLawVoteId", { user_id: user_id, law_vote: law.vote_history })
    .then((res) => {
        if(res.data) {
            console.log(res.data)
            alert(`Successfully voted NAY on ${law.title}`)
            setFetchLaws(true)
        }
    })
    .catch((err) => {
        console.log(err)
        alert(`Server Error Occured when casting vote`)
    })
}

const getLawCard = (law, setFetchLaws) => {
    const user_id = localStorage.getItem('user_id');
    const role = localStorage.getItem('role');
    const validRole = (role === "Citizen" || role === "Employee") 
    const alreadyVoted = law.vote_history.userID.indexOf(user_id) !== -1

    //console.log(`Is the current user a valid role: ${validRole}`)
    //console.log(`Has the current user voted already: ${alreadyVoted}`)

    if(law.state === "Pending" && validRole && !alreadyVoted) {
        return (
            <li className="card-text text-start" id={law._id}>
                {law.title}<br/>
                {law.description}<br/>
                <button 
                    className="like-button btn btn-success" 
                    onClick={(event) => {onVoteYay(event, user_id, law, setFetchLaws)}} 
                    data-key="YAY" 
                    value={law._id}
                    > YAY {law.vote_history.yesCount} </button>
                <button 
                    className="dislike-button btn btn-danger" 
                    onClick={(event) => {onVoteNay(event, user_id, law, setFetchLaws)}} 
                    data-key="NAY" 
                    value={law._id}
                    > NAY {law.vote_history.noCount} </button>
            </li>
        );
    }
    else if(law.state === "Pending" && (!validRole || alreadyVoted)) {
        // Saving these buttons incase we go back to them
        //<button className="like-button btn btn-success" disabled><i className="fa fa-thumbs-up"></i>Yay</button>
        //<button className="dislike-button btn btn-danger" disabled><i className="fa fa-thumbs-down"></i>Nay</button>
        return (
            <li className="card-text text-start" id={law._id}>
                {law.title}<br/>
                {law.description}<br/>
                <button 
                    className="like-button btn btn-success" 
                    onClick={(event) => {onVoteYay(event, user_id, law, setFetchLaws)}} 
                    data-key="YAY" 
                    value={law._id}
                    disabled
                    > YAY {law.vote_history.yesCount} </button>
                <button 
                    className="dislike-button btn btn-danger" 
                    onClick={(event) => {onVoteNay(event, user_id, law, setFetchLaws)}} 
                    data-key="NAY" 
                    value={law._id}
                    disabled
                    > NAY {law.vote_history.noCount} </button>
            </li>
        );
    }
    else if (law.state === "Active") {
        const title = `${law.title} (Active)`
        return (
            <li className="card-text text-start" id={law._id}>
                {title}<br/>
                {law.description}<br/>
            </li>
        );
    }
    else {
        // Law didnt pass so skip
    }
}

const onSubmitCreateLaw = (event, passedBy, description, title, departmentId, setFetchLaws) => {
    event.preventDefault()
    axios.post("http://localhost:9000/createLaw", { passedBy: passedBy, description: description, title: title, state: "Pending", departmentId: departmentId })
    .then((res1) => {
        //console.log(res1.data);
        // Law was created, noew create vote history
        axios.post("http://localhost:9000/createLawVote", { userID: res1.data.passedBy, lawID: res1.data._id}).then((res) => {
            //console.log(res.data);
            alert("Law Created Successfully")
            setFetchLaws(true);
        }) 
    })
    .catch((error) => {
        console.log(error);
        alert(error.response.data)
    })
}

const getDepartmentHeaderLeft = (name, budget, isMyDepartment) => {
    //Get the current user role
    //...
    //Conditionally render if we show the budget or not

    if(isMyDepartment) {
        return (
            <>
                <h4>{name}</h4>
                <h4>{`Available Budget: $${budget}`}</h4>
            </>
        )
    }
    else {
        return (
            <>
                <h4>{name}</h4>
            </>
        )
    }
}

const getDepartmentHeaderRight = (setContractFormOpen, contractFormOpen, setCreateLawFormOpen, createLawFormOpen, isMyDepartment) => {
    //Conditionally render buttons for create law, view contracts, post contracts, etc.
    if(isMyDepartment) {
        return (
            <>
                <button className="btn btn-primary active" onClick={() => {
                        if(createLawFormOpen === false && contractFormOpen === false) {
                            setCreateLawFormOpen(!createLawFormOpen)
                        }
                    }}>Create Law</button>
                <button className="btn btn-primary active" onClick={() => {
                        if(createLawFormOpen === false && contractFormOpen === false) {
                            setContractFormOpen(!contractFormOpen)
                        }
                    }}>Create Contract</button>
                <Link to = "/contractrequest" className="btn btn-primary active">
                   Contract Requests
                </Link>
            </>
        )
    }
    // Company?
    //else if(!Object.is(localStorage.getItem("company"), null)) {

    //}
    else {
        return (
            <>
                <h4>Welcome!</h4>
            </>
        )
    }
}

function Department()
{
    const [isMyDepartment, setIsMyDepartment] = useState(false);
    const [fetchIsMyDepartment, setFetchIsMyDepartment] = useState(true);

    const [contractFormOpen, setContractFormOpen] = useState(false)
    const [createLawFormOpen, setCreateLawFormOpen] = useState(false)

    const [lawTitle, setLawTitle] = useState("")
    const [lawDescription, setLawDescription] = useState("")

    const [currentDepartment, setCurrentDepartment] = useState(JSON.parse(localStorage.getItem('currentDepartment')))
    const [fetchDepartment, setFetchDepartment] = useState(true)
    
    const [laws, setLaws] = useState([])
    const [fetchLaws, setFetchLaws] = useState(true)
    
    const navigate = useNavigate();
    
    const user = localStorage.getItem('user_id');

    useEffect(() => {
        // Check That the user is signed in
        if(Object.is(user, null)) {
          alert("Please Login to View Departments!");
          navigate('/login');
        }
        if(fetchDepartment) {
            setCurrentDepartment(JSON.parse(localStorage.getItem('currentDepartment')))
            setFetchDepartment(false);
        }
        // If the current User is a city official -> check to see if this is their department
        if(localStorage.getItem("role") === "City Official" && fetchIsMyDepartment) {
            axios.get("http://localhost:9000/getCityOfficialByUserId", { params: { user_id: localStorage.getItem("user_id")}})
            .then((res) => {
                for(const co of res.data) {
                    const dept = JSON.parse(localStorage.getItem('currentDepartment'))
                    // Is the department assigned to the City Offical equal to the current Department?
                    if(co.departmentID === dept._id) {
                        setIsMyDepartment(true);
                        break;
                    }
                }
            })
            setFetchIsMyDepartment(false);
        }

        if(fetchLaws) {
            const dept = JSON.parse(localStorage.getItem('currentDepartment'))
            axios.get("http://localhost:9000/getLawsForDepartmentId", { params: { departmentId: dept._id}})
            .then((res) => {
                console.log(res.data)
                setLaws(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            setFetchLaws(false);
        }

    })

    if (!user) {
        return null;
    }

    return(
        <div>
            <NavBar/>
            <div className='container-fluid'>
                <div className='container subnav'>
                    <div className="top-left">
                    {
                        getDepartmentHeaderLeft(currentDepartment.name, currentDepartment.budget, isMyDepartment)
                    }
                    </div>
                    <div className="top-right">
                    {
                        getDepartmentHeaderRight(setContractFormOpen, contractFormOpen, setCreateLawFormOpen, createLawFormOpen, isMyDepartment)
                    } 
                    </div>
                </div>

                {
                    contractFormOpen && !createLawFormOpen && <div className = "Container">
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
                                <button type="submit" className="dislike-button btn btn-warning" onClick={() => setContractFormOpen(!contractFormOpen)}>Cancel</button>           
                                <button type="submit" className="like-button btn btn-primary" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
            }

            
            {
                    createLawFormOpen && !contractFormOpen && <div className = "Container">
                <div className="row row-style text-center">
                    <div className="col-lg-4 offset-4">
                        <h5>Create Law</h5>
                        <form className="form">
                        
                            <div className="form-group">
                                <textarea className="form-control" id="newLawTitle"  placeholder="Enter Title of Law"  onChange={(event) => setLawTitle(event.target.value)}
                                required/>
                            </div>
                            
                            <div className="form-group">
                                <textarea className="form-control" id="newLawTitle"  placeholder=" All tacos are free on Tuesdays..." onChange={(event) => setLawDescription(event.target.value)}
                                required/>
                            </div>

                            <div>
                                <button type="submit" className="dislike-button btn btn-warning" onClick={() => {
                                        setCreateLawFormOpen(!createLawFormOpen)
                                }}>Cancel</button> 

                                <button type="submit" className="like-button btn btn-primary" onClick={(event) => {
                                    onSubmitCreateLaw(event, localStorage.getItem("user_id"), lawDescription, lawTitle, currentDepartment._id, setFetchLaws)
                                    setCreateLawFormOpen(!createLawFormOpen)
                                }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
            }

                <div className="row row-style text-center" >
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                            <div className='card-title '><h5>List of Laws</h5>  </div> 
                                <ul className="custom-list">
                                {
                                    laws.map((law) => getLawCard(law, setFetchLaws))
                                }
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
            </div>
            <Footer />
        </div>
    );

}
export default Department;