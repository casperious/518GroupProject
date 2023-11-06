import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function CityDept() {
  const [cityOfficial, setCityOfficial] = useState(0);
  const [dept, setDept] = useState("");
  const [depts, setDepts] = useState({
    1: [], 
    2: [], 
    3: [], 
    4: [], 
  });

  useEffect(() => {
    setDepts({
      1: [
        { _id: 1, name: "Department 1" },
        { _id: 2, name: "Department 2" },
      ],
      2: [
        { _id: 3, name: "Department 1" },
        { _id: 4, name: "Department 2" },
      ],
      3: [
        { _id: 5, name: "Department 1" },
        { _id: 6, name: "Department 2" },
      ],
      4: [
        { _id: 7, name: "Department 1" },
        { _id: 8, name: "Department 2" },
      ],
    });
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    if (cityOfficial === 0) {
      alert("Please select a City Official");
      return;
    }
    if (dept.trim() === "") {
      alert("Please select a department");
      return;
    }

    setDept("");
    setCityOfficial(0);
    document.getElementById('dept').value = "";
    document.getElementById('cityOfficial').value = 0;
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center lcontainer">
        <form className="col-6">
          <h2 id="title">Departments under City Officials</h2>
          <div className="form-group">
            <label htmlFor="cityOfficial">City Officials:</label>
            <select
              className="form-control"
              name="cityOfficial"
              id="cityOfficial"
              value={cityOfficial}
              onChange={(e) => setCityOfficial(parseInt(e.target.value))}
            >
              <option value={0}>Select a City Official</option>
              {Object.keys(depts).map((officialKey) => (
                <option key={officialKey} value={officialKey}>
                  City Official {officialKey}
                </option>
              ))}
            </select>
          </div>

          { cityOfficial !== 0 && (
            <div className="form-group">
              <label htmlFor="dept">List of departments:</label>
              <select
                className="form-control"
                name="dept"
                id="dept"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="">Select a department</option>
                {depts[cityOfficial].map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <br />
          <a href='/Employeeselection' className="login-link">
              SignIn here
            </a>
        </form>
      </div>
    </div>
  );
}

export default CityDept;
