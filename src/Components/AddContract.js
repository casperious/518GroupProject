import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function AddContract() {
  const [company, setCompany] = useState(0);
  const [contract, setContract] = useState("");
  const [contracts, setContracts] = useState({
    1: [], 
    2: [], 
    3: [], 
    4: [], 
  });

  useEffect(() => {
    setContracts({
      1: [
        { _id: 1, name: "Contract 1A" },
        { _id: 2, name: "Contract 2A" },
      ],
      2: [
        { _id: 3, name: "Contract 1B" },
        { _id: 4, name: "Contract 2B" },
      ],
      3: [
        { _id: 5, name: "Contract 1C" },
        { _id: 6, name: "Contract 2C" },
      ],
      4: [
        { _id: 7, name: "Contract 1D" },
        { _id: 8, name: "Contract 2D" },
      ],
    });
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();
    if (company === 0) {
      alert("Please select a Company");
      return;
    }
    if (contract.trim() === "") {
      alert("Please select a Contract");
      return;
    }

    setContract("");
    setCompany(0);
    document.getElementById('contract').value = "";
    document.getElementById('company').value = 0;
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center lcontainer">
        <form className="col-6">
          <h2 id="title">Contract Information</h2>
          <div className="form-group">
            <label htmlFor="company">Company:</label>
            <select
              className="form-control"
              name="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(parseInt(e.target.value))}
            >
              <option value={0}>Select a Company</option>
              {Object.keys(contracts).map((companyKey) => (
                <option key={companyKey} value={companyKey}>
                  Company {companyKey}
                </option>
              ))}
            </select>
          </div>

          {company !== 0 && (
            <div className="form-group">
              <label htmlFor="contract">Contract:</label>
              <select
                className="form-control"
                name="contract"
                id="contract"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              >
                <option value="">Select a Contract</option>
                {contracts[company].map((contract) => (
                  <option key={contract._id} value={contract._id}>
                    {contract.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <br />
          <button type="button" onClick={onClickHandler} className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddContract;
