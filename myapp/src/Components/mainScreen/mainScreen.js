import React from 'react';
import { useState } from "react";
import text from 'react';
import "./mainScreen.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function MainScreen() {
  const history = useNavigate();
  const onSubmit = () =>{
    console.log('sign In submit')
    const DATA = {
      "Username": Name,
      "Password": Password
    }
    axios.post('http://localhost:3003/users/validate', DATA)
    .then(response => {
      if(response.data.exists){
        history("/mainPage", {state: Name});
      }
      else{
        alert('Invalid credentials')
      }
    });
}
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  // render() {
    return (
      <div className='parent'>
      <div className="parentDiv">
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
        <label className='label'>Password:
          <input
            placeholder='Password'
            className='input'
            type="text" 
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> 
        <label className='label'>
          <button
            className='submit'
            onClick={()=>onSubmit()} 
          > 
          <div className='text'>
            SIGN IN
          </div>
          </button> 
        </label> 
        <div className='singINSU'><Link to="/">Sign up</Link></div>   
      </div>
      </div>
    ); 
  // }
}

export default <MainScreen />;