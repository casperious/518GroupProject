import { useEffect, useState } from "react";
import { Button, Alert, } from "react-bootstrap";
import '../App.css';
//import backgroundImage from './background.jpg';
import axios from 'axios';
import NavBar from "./NavBar";
import Footer from "./footer";

function Alerts() {
    const [alerts, setAlert] = useState("")
    const [depId, setdepId] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const announcement = {
            userId: userId,
            departmentId: depId.departmentID,
            Announcement: alerts,
        };
    
        try {
            await axios.post("http://localhost:9000/AddAnnouncement", announcement);
            alert("Added Announcement");
            setAlert("")
        } catch (error) {
            console.log("Unable to add announcements", error);
        }
    };
    
    let userId = localStorage.getItem('user_id')
    useEffect(()=>
    {
        axios.get(`http://localhost:9000/getdepIdbyCO/${userId}`)
        .then((res)=>
        {
            console.log(res.data)
            setdepId(res.data)

        })
        .catch((error) =>
        {
            console.error("unable to fetch depId",error)
        })

    },[])
    return (
        <div>
            <NavBar />
            <div className="row row-style justify-content-center ">
                <div className="col-lg-4 col-lg-offset-4">
                    <form  className="form">
                        <div className="form-group">
                            <label><h5>Add Important Alerts</h5></label>
                            <input
                                type="text"
                                value={alerts}
                                onChange={(e)=>setAlert(e.target.value)}
                                placeholder="Enter Announcement "
                                className="form-control"
                                
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary button" onClick={handleSubmit}>Submit</button>
                        
                    </form>

                </div>
            </div>
                 
            <Footer />


        </div>
    );
}

export default Alerts;