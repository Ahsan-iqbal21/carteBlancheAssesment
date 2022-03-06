import React from 'react';
import { useState } from "react";
import text from 'react';
import "./SignUp.css";
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SignUp(){
  const history = useNavigate();
  const onSubmit = () => {
    if(Password == "" || Name == "" || Email == "" || CPassword == ""){
      alert("Please fill the form completely")
    }
    else if(Password != CPassword){
      alert("Password and confirm password does not match")
    }
    else{
      const DATA = {
        "Username": Name,
        "Password": Password,
        "Email":Email,
        "Tasks":[]
    }
      axios.post('http://localhost:3003/users/register', DATA)
      .then(response => console.log(response));
      history("/signIn");
    }
  }
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [CPassword, setCPassword] = useState("");
  // render() {
    return (
      <div className='parent'>
      <div className="parentDivSignUp">
        <div className='logo'>
          <div className='textLogo'>
            TO DO
          </div>
        </div>
        <div className='logo2'>
          
        </div>
        <label className='label'>Username:
          <input
            placeholder='Username'
            className='input'
            type="text" 
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </label> 
        <label className='label'>Email:
          <input
            placeholder='Email'
            className='input'
            type="text" 
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label> 
        <label className='label'>Password:
          <input
            placeholder='Password'
            className='input'
            type="text" 
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> 
        <label className='label'>Confirm Password:
          <input
            placeholder='Password'
            className='input'
            type="text" 
            value={CPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </label> 
        <label className='label'>
          <button
            className='submit'
            onClick={()=>onSubmit()} 
          > 
          <div className='text'>
            SIGN UP
          </div>
          </button> 
        </label> 
        <div className='singINSU'><Link to="/signIn">Sign in</Link></div>  
      </div>
      </div>
    ); 
}

export default <SignUp />;