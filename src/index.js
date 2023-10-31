import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='/signUpCompany' element={<SignUpCompany/>} />
      <Route path='/voteMayor' element={<VoteMayor/>} />
      <Route path='/sendFeedback' element={<AddFeedback/>} />
      <Route path='/sendComplaint' element={<AddComplaint/>} />
      <Route path='/viewLaws' element={<ViewLaws/>} />
      <Route path='/signup' element={<SignUpUser/>}></Route>
    </>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
