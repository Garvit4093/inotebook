import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
const Sign = (props) => {
  const [credentials, setCred] = useState({name:"",email:"",password:"",cpass:""});
  const navigate=useNavigate();
  const handleClick=async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/auth/createUser",{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    });
    if(credentials.cpass===credentials.password){
      const json=await response.json();
    console.log(json);
    if (json.success){
      localStorage.setItem('token',json.authtoken);
      navigate("/login"); 
      props.showAlert("Account created successfully!","success")
    }
    else{
      props.showAlert("Invalid credentials","danger")
    }
    }
    else{
      props.showAlert("Password and Confirm Password do not match.","danger")
    }
  }
  const onChange = (e)=>{
    setCred({...credentials, [e.target.name]: e.target.value})
  } 
  return (
    <>
    <div className='container' style={{marginBottom:"50px"}}>
      <h1>Sign Up For Your Account</h1>
    </div>
    <div className='container'>
      
      <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="exampleInput1" className="form-label">Username</label>
    <input type="text" className="form-control"  placeholder='Username' name="name" onChange={onChange} value={credentials.name} id="exampleInput1" required minLength={3} />
  </div>  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" placeholder='Email' name="email" onChange={onChange} value={credentials.email} id="exampleInputEmail1" required minLength={6} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" placeholder='Password' name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1" required minLength={6}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="text" className="form-control" placeholder='Confirm Password' name="cpass" onChange={onChange}  id="exampleInputPassword" required minLength={6}/>
  </div>
  <div className="mb-3 d-flex">
    <h5>Already Registered?</h5>
    <Link className='mx-2' to={"/login"}>Login</Link>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </>
  )
}

export default Sign
