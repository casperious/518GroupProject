import { React, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import '../index.css';
import axios from 'axios'

import Footer from './footer';
import NavBar from './NavBar';

const getHomePageBanner = (mayor) => {
    const mayorText = `Current Mayor: ${mayor.firstName} ${mayor.lastName}`
    return (
        <div>
            <h1 className="display-4">Delegate</h1>
            <p className="lead">{mayorText}</p>
        </div>
    )
}

function Home() {
    const [mayor, setMayor] = useState({})
    const [fetchMayor, setFetchMayor] = useState(true)
    const [electMayor, setElectMayor] = useState(true)
    const [alerts,setAlerts] = useState([])
    const [contracts, setContracts] = useState([])
    const [passedLaws, setPassedLaws] = useState([])
    const [fetchLaws, setFetchLaws] = useState(true)

    useEffect(() => {
        if(electMayor) {
            try {
                axios.post("http://localhost:9000/promoteMayor", {})
                .then((res) => {
                    if(res.data) {
                        console.log(res.data)
                        // Mayor is elected now fetch the mayor
                        if(fetchMayor) {
                            try {
                                axios.get("http://localhost:9000/getMayorDetails", {})
                                .then((res) => {
                                    if(res.data) {
                                        console.log(res.data)
                                        setMayor(res.data)
                                    }
                                })
                                setFetchMayor(false)
                            }
                            catch(err) {
                                console.log(err)
                            }
                        }
                    }
                })
            }
            catch(err){
                console.log(err)
            }
            setElectMayor(false)
        }

        if(fetchLaws) {
            try {
                axios.get("http://localhost:9000/getAllLawsAndVoteHistory", { })
                .then((res)=> {
                    if(res.data) {
                        setPassedLaws(res.data)
                        //console.log(res.data)
                    }
                })
                .catch((error)=> {
                    console.log(error)
                })
            }
            catch (err) {
                console.log(err)
            }
            setFetchLaws(false)
        }
    })

    useEffect(()=>
    {
        axios.get("http://localhost:9000/getAlerts")
        .then((res)=>
        {
            setAlerts(res.data)
            //console.log(res.data)
        })
        .catch((error)=>
        {
            console.log("error")
        })
    },[])

    useEffect(()=>
    {
        axios.get("http://localhost:9000/getContractsAll")
        .then((res)=>
        {
            setContracts(res.data)
            //console.log(res.data)
        })
        .catch((error)=>
        {
            console.log("error")
        })
    },[])
    // useEffect(()=>
    // {
    //     axios.get("http://localhost:9000/getAlerts")
    //     .then((res)=>
    //     {
    //         setAlerts(res.data)
    //         console.log(res.data)
    //     })
    //     .catch((error)=>
    //     {
    //         console.log("error")
    //     })
    // },[])
    

    return (
        <div>
           <NavBar /> 
            <div >
                <img src="/images/bg.jpg" alt="banner" className="image"  />
                <div className="jumbotron mt-2 custom-jumbotron text-center banner_content">
                    {getHomePageBanner(mayor)}
                </div>
                
                <div className="row row-style text-center" >
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>Important Alerts</h3>
                                <ul className="custom-list">
                                    {alerts.map((a) => (
                                        <li key={a._id} className="card-text text-start">
                                            {a.Announcement}
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h3>New Contracts</h3>
                                <ul className="custom-list">
                                    {contracts.map((c) => {
                                        if(c.status==="Pending")
                                        {
                                            return(
                                            <li key={c._id} className="card-text text-start">
                                            { c.description}
                                            </li>)
                                        }
                                        
                                    })}
                                </ul>
                                
                            </div>
                        </div>
                    </div>


                    
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                            <div><h3>Latest Laws Passed</h3></div>
                            
                            <ul className="custom-list">{
                                passedLaws.map((law) => {
                                        if(law.state==="Active")
                                        {
                                            const lawText = `${law.title} - ${law.department.name} - (${law.vote_history.yesCount} - ${law.vote_history.noCount})`
                                            return(
                                            <li key={law._id} className="card-text text-start">
                                            {lawText}
                                            </li>)
                                        }
                                        
                                    })}
                            </ul>
                            
                            </div>
                        </div>
                    </div>
                    
                  
                </div>

            </div>
            <Footer/>
            
            
        </div>
    );
}

export default Home;


