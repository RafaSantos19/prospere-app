import React, { useContext } from 'react';
import AuthContext from '../../context/auth';
import profile from '../../assets/profile.png'
import './style.scss'
import bronze from '../../assets/medal-bronze.png';
import silver from '../../assets/medal_silver.png';
import gold from '../../assets/medal-gold.png';

function Profile() {
  const { signed, user } = useContext(AuthContext);

  return (
    !signed
      ? <Redirect to="/" />
      :
      <div className="container-fluid py-4 profile">

        <div className="card-group my-0 card-group justify-content-evenly" >

          <div className="col-xl-4 col-xxl-3 text-center">

            <div className="card-bg p-5 mx-4 my-4">

              <div className='card-img-top hover mt-5 mb-5'>
                <img src={profile} alt="" className='w-75' />
              </div>

              <ul className='card-text text-light mb-2'>
                <li className="list-group-item">
                  Nome: <span>
                    {user.name ? user.name.toUpperCase() : "NULL"}
                  </span>
                </li>
                <li className="list-group-item">
                  Email: <span>
                    {user.email ? user.email : "NULL"}
                  </span>
                </li>
                <li className="list-group-item">
                  XP: <span>
                    {user.xp ? user.xp : 0}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-xxl-6 text-center">
            <div className="card-bg p-5 mx-4 my-4">
              <h2>Medalhas</h2>
              <div className="">
                <img src={bronze} alt="" className='imgg' />
                <img src={silver} alt="" className='imgg' />
                <img src={gold} alt="" className='imgg' />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile