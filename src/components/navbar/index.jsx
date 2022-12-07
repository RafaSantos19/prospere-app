import React, { useContext, useState, useEffect } from 'react';
import icon from '../../assets/logo_png_real_branca.png'
import AuthContext from '../../context/auth';
import './style.scss';


function Navbar() {
  const { signed } = useContext(AuthContext)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const path = (window.location.href.split('/')).slice(-1)[0]
    setMenu((path === 'login' || path === ''))
  }, [signed])

  return (
    <>
      <nav className="navbar navbar-expand-md bg-nav">
        <div className="container-fluid">
          <a
            href='/home'
            className="navbar-brand">
            <img src={icon} alt="Bootstrap" style={{ width: "80px" }} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {signed &&
              <ul className="navbar-nav d-flex nav-hover">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/about">Sobre</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/board">Board</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Perfil</a>
                </li>
              </ul>
            }
            <li className="nav-item ms-auto">
            {
              !menu ?
                !signed
                  ? (<a href='/' className="btn bg-light text-dark btn-sm">Login</a>)
                  : (<button className="btn bg-light text-dark btn-sm">Logout</button>)
                : null
            }
            </li>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar