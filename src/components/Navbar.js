import React from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";
const Navbar = () => {
  let location=useLocation();
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><h2>iNotebook</h2></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <a className={`nav-link ${location.pathname==='/'?"active":"inactive"} `} aria-current="page" href="/" style={{marginLeft:"30px"}}><h3>Home</h3></a>
        </li>
        <li className="nav-item ">
          <a className={`nav-link ${location.pathname==='/about'?"active":"inactive"} `} aria-current="page" href="/about" style={{marginLeft:"30px"}}><h3>About</h3></a>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form className='d-flex'>
      <Link className='btn btn-primary mx-2' to="/login" role="button" >Login</Link>
      <Link className='btn btn-primary mx-2' to="/signUp" role="button" >Sign Up</Link>
      </form>:<button onClick={logout} className='btn btn-primary'>Logout</button>
      }
    </div>
  </div>
</nav>
</>
  )
}
export default Navbar;