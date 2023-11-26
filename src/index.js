import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import App from './App';
import NavBar from './Components/NavBar';
import SignUpCompany from './Components/SignUpCompany';
import reportWebVitals from './reportWebVitals';
import VoteMayor from './Components/VoteMayor';
import AddFeedback from './Components/AddFeedback';
import AddComplaint from './Components/AddComplaint';
import ViewLaws from './Components/ViewLaws';
import SignUpUser from './Components/SignUpUser';
import LoginPage from './Components/Login';
import RegisterCandidate from './Components/RegisterCandidate';
import Home from './Components/Home';
import Department from './Components/Departments';
import ContractRequest from './Components/contractrequest';
import ViewMore from './Components/viewmore';
import ApplyContract from './Components/ApplyContract';
import Cityofficialsdepartments from './Components/Cityofficialsdepartments'
import MayorDepartments from './Components/MayorDepartments';
import CreateDepartment from './Components/CreateDepartment';
import CreateCityOfficial from './Components/CreateCityOfficial';
import DepartmentControl from './Components/DepartmentControl';
import Footer from './Components/footer';
import Companylogin from './Components/Companylogin';
import MyContracts from './Components/MyContracts';
import MayorHome from './Components/MayorHome';
import ViewFeedbackAndComplaints from './Components/ViewFeedbackAndComplaints';
import SponsorMayoralCandidates from './Components/SponsorMayoralCandidates';
import Alerts from './Components/Alerts'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/contractrequest' element={<ContractRequest />} />
      <Route path="/ApplyContract/:contractId" element={<ApplyContract />} />
      <Route path='/viewmore' element={<ViewMore />} />
      <Route path='/Department' element={<Department />} />
      <Route path='/signUpCompany' element={<SignUpCompany />} />
      <Route path='/voteMayor' element={<VoteMayor />} />
      <Route path='/sendFeedback' element={<AddFeedback />} />
      <Route path='/sendComplaint' element={<AddComplaint />} />
      <Route path='/viewLaws' element={<ViewLaws />} />
      <Route path='/Cityofficialsdepartments' element={<Cityofficialsdepartments />} />
      <Route path='/signup' element={<SignUpUser />}></Route>
      <Route path='/Login' element={<LoginPage />}></Route>
      <Route path='/RegisterCandidate' element={<RegisterCandidate />}></Route>
      <Route path='/MayorDepartments' element={<MayorDepartments />}></Route>
      <Route path='/CreateDepartment' element={<CreateDepartment />}></Route>
      <Route path='/CreateCityOfficial' element={<CreateCityOfficial />}></Route>
      <Route path='/DepartmentControl/:department_id' element={<DepartmentControl />}></Route>
      <Route path = '/MyContracts' element = {<MyContracts />}> </Route>
      <Route path='/Companylogin' element={<Companylogin />}></Route>
      <Route path='/MayorHome' element={<MayorHome />}></Route>
      <Route path='/ViewFeedbackAndComplaints' element={<ViewFeedbackAndComplaints/>}></Route>
      <Route path='/SponsorCandidates' element={<SponsorMayoralCandidates/>}></Route>
      <Route path='/Alerts' element={<Alerts/>}> </Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}>

  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
