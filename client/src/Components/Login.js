import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, phone }
    try {
      const response = await axios.post('http://localhost:8001/login', data);
      const token = response.data.token;
      if(token){
        localStorage.setItem('token', token);
        navigate('/home');
      } else if(response.data.error){
        toast.warn('Email is already exist with another name');
      }
    }catch(err) {
      console.log(err);
    }
  };

  return (
    <div className='container-login'>
      <form>
        <div className='container-login-2'>
          <div className='heading'>
            Login
          </div>
        </div>
        <div className='col-md-9 offset-sm-1'>
          <label htmlFor='name'>
            Name
            <sup style={{ color: 'red' }}>
              <b>*</b>
            </sup>
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            placeholder='Enter Your name'
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div className='col-md-9  offset-sm-1'>
          <label htmlFor='email'>
            Email
            <sup style={{ color: 'red' }}>
              <b>*</b>
            </sup>
          </label>
          <br />
          <input
            type='text'
            className='form-control'
            id='email'
            placeholder='Enter your email address'
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div className='col-md-9  offset-sm-1'>
          <label htmlFor='phone'>
            Phone Number
            <sup style={{ color: 'red' }}>
              <b>*</b>
            </sup>
          </label>
          <br />
          <input
            type='text'
            className='form-control'
            id='phone'
            placeholder='Enter your Phone Number'
            value={phone}
            onInput={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary offset-sm-1 btn-xl btn-2' onClick={(e) => handleSubmit(e)}>
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
