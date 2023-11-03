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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/contractrequest' element={<ContractRequest />} />
      <Route path='/ApplyContract' element={<ApplyContract />} />
      <Route path='/viewmore' element={<ViewMore />} />
      <Route path='/Department' element = {<Department />} />
      <Route path='/signUpCompany' element={<SignUpCompany />} />
      <Route path='/voteMayor' element={<VoteMayor />} />
      <Route path='/sendFeedback' element={<AddFeedback />} />
      <Route path='/sendComplaint' element={<AddComplaint />} />
      <Route path='/viewLaws' element={<ViewLaws />} />
      <Route path='/signup' element={<SignUpUser />}></Route>
      <Route path='/Login' element={<LoginPage />}></Route>
      <Route path='/RegisterCandidate' element={<RegisterCandidate />}></Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
