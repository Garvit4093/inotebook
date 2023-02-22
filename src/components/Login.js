import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
const Login = (props) => {
  const [credentials, setCred] = useState({email:"",password:""});
  const navigate=useNavigate();
  const handleClick=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    console.log(json);
    if (json.success){
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Logged In successfully","success")
    }
    else{
      props.showAlert("Invalid credentials","danger")
    }
  }
  const onChange = (e)=>{
    setCred({...credentials, [e.target.name]: e.target.value})
  } 
  return (
     <>
     <div className='container' style={{marginBottom:"50px"}}>
      <h1>Login To Your Account</h1>
    </div>
    <div className='container'>
      
      <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" placeholder='Email' value={credentials.email} onChange={onChange} name='email' id="exampleInputEmail1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    <input type="password" className="form-control" placeholder='Password' value={credentials.password} onChange={onChange} name='password' id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 d-flex">
    <h5>Not Registered?</h5>
    <Link className='mx-2' to={"/signUp"}>Sign Up</Link>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
    </>
  )
}

export default Login
