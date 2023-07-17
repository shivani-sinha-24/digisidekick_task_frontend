import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({setIsLoggedin}) => {
  const user = useSelector(state=>state.user)
  const navigate = useNavigate()

  const logout = ()=>{localStorage.clear();setIsLoggedin(false);navigate("../", { replace: true })}
  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={'/'} className="navbar-brand" href="#">Digi Side Kick</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'/'} className="nav-link active" aria-current="page" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/new-user'} className="nav-link" href="#">Create new User</Link>
            </li>
          </ul>
          <div className='d-flex'>
            <div className="btn btn-light disabled">{user?.name}</div>
            <button className="btn btn-outline-danger d-flex align-items-center" type="submit" onClick={(e)=>logout(e)}>Logout <i style={{fontSize:"24px" }}className="fa mx-1">&#xf08b;</i></button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
