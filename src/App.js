import './App.css';
import logo from './logo.svg'
import { Routes, Route, useLocation, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import SignUpCompany from './Components/SignUpCompany'
import Home from './Components/Home'
import LoginPage from './Components/Login';
import MayorDepartments from './Components/MayorDepartments';
import SignUpUser from './Components/SignUpUser';
import RegisterCandidate from './Components/RegisterCandidate';
import CreateDepartment from './Components/CreateDepartment';
import CreateCityOfficial from './Components/CreateCityOfficial';
import DepartmentControl from './Components/DepartmentControl';
import MayorHome from './Components/MayorHome';

function App() {
  const navigate = useNavigate()
  const user_id = localStorage.getItem("user_id");
  // Welcome {user_id}
  return (
    <Routes>
      <Route path='/' element={
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <button onClick={(event) => {
            navigate("SignUpCompany")
          }}>To SignUp Company Page</button>
        </div>
      } />
      <Route path='SignUpCompany' element={<SignUpCompany />} />
      <Route path='Home' element={<Home />} />
      <Route path='/Login' element={<LoginPage />}></Route>
      <Route path='/MayorDepartments' element={<MayorDepartments />}></Route>
      <Route path='/RegisterCandidate' element={<RegisterCandidate />}></Route>
      <Route path='/CreateDepartment' element={<CreateDepartment />}></Route>
      <Route path='/CreateCityOfficial' element={<CreateCityOfficial />}></Route>
      <Route path='/DepartmentControl/:department_id' element={<DepartmentControl />}></Route>
      <Route path='/MayorHome' element={<MayorHome />}></Route>
    </Routes>
  );

}

export default App;
