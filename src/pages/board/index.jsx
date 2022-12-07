import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

import planet1 from '../../assets/planet_1.png'
import planet2 from '../../assets/planet_2.png'
import planet3 from '../../assets/planet_3.png'
import planet4 from '../../assets/planet_4.png'
import planet5 from '../../assets/planet_5.png'
import planet6 from '../../assets/planet_6.png'
import planet7 from '../../assets/planet_7.png'
import planet8 from '../../assets/planet_8.png'

import AuthContext from '../../context/auth';

import './style.scss'

function Board() {
  const planets = [planet1, planet2, planet3, planet4, planet5, planet6, planet7, planet8]

  const { signed, user } = useContext(AuthContext)
  const history = useHistory()

  const [err, setErr] = useState({ status: false, msg: '' })
  const [levels, setLevels] = useState({ isLoaded: false, list: [] })
  const [showToast, setShowToast] = useState({ show: false, desc: "" })
  
  const handleError = (error) => {
    setErr({ status: true, msg: error.message })
  }

  const handleToast = (toast) => {
    setShowToast(toast)
  }

  const handleLevel = (level_id) => {
    fetch(`http://localhost:8080/level/${level_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
      .then(response => response.json())
      .then((response) => {
        if (response['message']) {
          throw new Error(response['message'])
        }
        setLevels({ isLoaded: true, ...response })
      })
      .catch((error) => {
        handleError(error)
      })
  }

  const listLevels = () => {
    fetch(`http://localhost:8080/level/list`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
      .then(response => response.json())
      .then((response) => {
        if (response['message']) {
          throw new Error(response['message'])
        }
        const list = response.levels.map(level => mapping_levels(level))
        setLevels({ isLoaded: true, list })
      })
      .catch((error) => {
        handleError(error)
      })
  }

  const mapping_levels = (level) =>({
    id: level.id,
    theme: level.theme,
    img: planets[level.id - 1],
    difficult: level.difficult,
    questions: [...level.questions]
  })

  const mapping_plannets = () => {
    return levels.list.map(level => (
      <li
        key={`planet-${level.id}`}
        onMouseOver={() => handleToast({ show: true, desc: level.theme })}
      >
        <Link to={`/level/${level.id}`}>
          <img src={level.img} className="planet" />
        </Link>
      </li>
    ))
  }

  useEffect(() => {
    listLevels()
  }, [])

  useEffect(() => {
    if(!signed) history.push("/")
  }, [signed])

  return (
      <div className="container-fluid h-100 py-5 board">
        <div className="row py-5 justify-content-evenly">
          <div className="col-12 text-center">
            <ul className='circle-container'>
              {mapping_plannets()}
              <li>
                <Toast
                  className='rounded-5'
                  onClose={() => handleToast({ ...showToast, show: false })}
                  show={showToast.show}
                  // delay={500}
                  autohide={true}
                >
                  {showToast.desc.toUpperCase()}
                </Toast>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Board