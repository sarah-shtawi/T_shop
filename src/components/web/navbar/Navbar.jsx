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
          <a className="navbar-brand" href="#">My Store <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512" className='ms-3'><path fill="#f7f7f7" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>   </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/products'>Products</Link>
              </li>
              {userToken ? <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart({count})</Link>
              </li> : null}

            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
