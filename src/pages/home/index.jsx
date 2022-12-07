import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profile from '../../assets/profile.png'
import travel from '../../assets/rocket-p.svg'
import AuthContext from '../../context/auth';

import './style.scss'

function Home() {
  const history = useHistory()
  const { signed, user, err } = useContext(AuthContext)

  useEffect(() => {
    if(!signed) history.push("/login")
  }, [])

  return (
    <div className="container-fluid py-4 home">
      <div className="card-group my-0 card-group justify-content-evenly" >
        <div className="col-4 text-center">
          <div className="card-bg p-5 mx-4 my-4">
            <div className='card-img-top hover'>
              <img src={travel} alt="" className='h-100' />
            </div>
            <div className="position-absolute fixed-bottom p-3 mb-3">
              <button onClick={() => history.push("/board")} className="btn btn-lg btn-warning w-50 fw-bold hover">Travel</button>
              {/* <Link to="/board" className="btn btn-lg btn-warning w-50 fw-bold hover">Travel</Link> */}
            </div>
          </div>
        </div>
        <div className="col-4 text-center">
          <div className="card-bg p-5 mx-4 my-4">
            <div className='card-img-top hover mt-5 mb-5'>
              <img src={profile} alt="" className='w-25' />
            </div>
            <div className='card-text fs-1 fw-bold text-light mb-2'>
              {user.name ? <p className='m-3'>{user.name}</p> : "NULL"}
            </div>
            <div className="progress m-3 mt-5">
              <div className="progress-bar bg-warning"
                role="progressbar"
                aria-label="Warning example"
                style={{ width: `${user.xp / 10}%` }}
                aria-valuenow={`${user.xp}`}
                aria-valuemin="0"
                aria-valuemax="100">
              </div>
            </div>
            <div className="position-absolute fixed-bottom p-3 mb-3">
              <Link to="/profile" className="btn btn-lg btn-warning w-50 fw-bold hover">Perfil</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home