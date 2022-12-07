import React, { useState, useContext, useEffect } from 'react';

import { Link, useParams, useLocation } from 'react-router-dom';
import './style.scss'

import AuthContext from '../../../context/auth';

function Level() {

  const { signed, user } = useContext(AuthContext)
  const { id } = useParams()

  const [level, setLevel] = useState({
    id: "",
    theme: "",
    difficult: "",
    questions: [],
    isLoaded: false
  })

  const [err, setErr] = useState({status: false, msg: ""})

  const generateQuestionMenu = () => {
    return level.questions.map((question) => (
      <li key={`Q-${question.id}`} className="list-group-item">
        <Link to={`/start/${level.id}/${question.id}`} className="btn btn-warning w-100 fw-bold hover my-2">{`Fase ${question.id}`}</Link>
      </li>
    ))
  }

  const handleLevel = (id) => {
    fetch(`http://localhost:8080/level/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
      .then(response => response.json())
      .then((response) => {
        if (response['message']) {
          throw new Error(response['message'])
        }
        setLevel({ isLoaded: true, ...response.level })
      })
      .catch((error) => {
        setErr({
          status: Boolean(error.message),
          msg: error.message
        })
      })
  }

  const handlePoints = () => {
    return level.questions.map(a => a.points).reduce((a, b) => a+b, 0)
  }


  useEffect(() => {
    handleLevel(id)
  }, [id])

  return (
    !signed
    ? <Redirect to="/" />
    :
    <div className="container-fluid py-4 level">
      <div className="container py-4 card-group card-group-bg rounded-5 card-group justify-content-evenly" >
        <div className="col-4 text-center">
          <div className="card-body-level p-5 mx-4">
            {/* <div className='card-img-top hover'>
              <img src={this.state?.img} alt="" className='h-100' />
            </div> */}
            <p className='text-light fw-bold fs-3 py-3'>{level.theme}</p>
            <p className='text-light fw-bold fs-3 py-3'>{level.dificcult}</p>
            <p className='text-light fw-bold fs-3 pt-3'>Recompensa</p>
            <p className='text-warning fw-bold fs-3 py-3'>{handlePoints()} XP</p>
            <div className="position-absolute fixed-bottom p-3 mb-3">
            <Link to={`/start/${level.id}/${level.questions[0]?.id}`} className="btn btn-warning w-75 fw-bold fs-3 hover">Start</Link>
            </div>
          </div>
        </div>
        <div className="col-4 text-center">
          <ul className="card-body-level p-5 mx-4">
            <li className="list-group-item">
              <Link to={`start/${level.id}/help`} className="btn btn-warning w-100 fw-bold hover mb-3">TUTORIAL</Link>
            </li>
            {generateQuestionMenu()}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Level