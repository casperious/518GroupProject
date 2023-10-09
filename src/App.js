import logo from './logo.svg';
import './App.css';
import { Routes, Route, useLocation, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import SignUpCompany from './Components/SignUpCompany'
import Home from './Components/Home'

function App() {
  const navigate = useNavigate()
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
      }/>
      <Route path='SignUpCompany' element={<SignUpCompany/>}/>
      <Route path='Home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
