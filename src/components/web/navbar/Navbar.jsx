import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { UserContext } from '../context/User'
import { ContextCart } from '../context/Cart';
export default function Navbar() {
  const navigate = useNavigate();
  let { userToken, setUserToken, userData, setUserData } = useContext(UserContext);
  let { count } = useContext(ContextCart);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserData(null)
    navigate('/');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand text-black fw-bold" href="#">T-shop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-black fw-bold" href="#">Products</a>
              </li>
              {userToken ? <li className="nav-item">
                <Link className="nav-link text-black fw-bold" to="/cart">Cart({count})</Link>
              </li> : null}

            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-black fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData != null ? userData.userName : 'Account'}
                </a>
                <ul className="dropdown-menu ">
                  {
                    userToken == null ? <>
                      <li><Link className="dropdown-item text-black fw-bold" to="/register">register</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item text-black fw-bold" to="/login">login</Link></li>
                    </> : <>
                      <li><Link className="dropdown-item text-black fw-bold" to="/profile">Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item text-black fw-bold" onClick={logout}>LogOut</Link></li>
                    </>
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
