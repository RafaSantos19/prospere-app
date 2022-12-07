import React, { useState, useContext, useEffect } from 'react';
import { Last } from 'react-bootstrap/esm/PageItem';
import { useParams, useHistory } from 'react-router-dom'
import AuthContext from '../../../../context/auth';

import './style.scss'

function Question() {
  
  const { signed, user } = useContext(AuthContext)
  const { level, id } = useParams()
  const history = useHistory()

  const [last, setLast] = useState([])
  const [ answer, setAnswer ] = useState(0)
  const [ answerList, setAnswerList ] = useState([])
  const [ question, setQuestion] = useState({
    id: id,
    description: "",
    level: "",
    points: "",
    isLoaded: false
  })
  const [ err, setErr ] = useState({ status: false, msg: "" })

  const handleAssert = () => checkAnswer(question.id, answer)

  const handleAnswer = (answer) => setAnswer(answer)

  const handleError = (error) => setErr({ status: true, msg: error.message })
  
  const checkAnswer = (questionId, answer) => {
    fetch(`http://localhost:8080/question/${questionId}/answer/${answer}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
      window.alert("Sua resposta correta")
      sumXp(user.id, question.points)
      nextQuestion(level, question.id)

      if(last.length>=4) {
        window.alert("Você concluiu esse nivel!\nVamos para o próximo?")
        history.push("/board")
      }
    })
    .catch((error) => {
      window.alert("Sua resposta incorreta")
      nextQuestion(level, question.id)
      if(last.length>=4) {
        window.alert("Você concluiu esse nivel!\nVamos para o próximo?")
        history.push("/board")
      }
      handleError(error)
    })
}

const nextQuestion = (level, id) => {
  fetch(`http://localhost:8080/level/${level}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
      setLast([...last, id])
      setAnswer()
      const next = response.level.questions
        .filter(newQuestion => newQuestion.id !== id && !last.includes(newQuestion.id))[0]
        getQuestion(next.level, next.id)
    })
    .catch((error) => {
      setErr({
        status: Boolean(error.message),
        msg: error.message
      })
    })
}

const getQuestion = (level, id) => {
  fetch(`http://localhost:8080/question/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
      const quest = response.question
      setQuestion({ isLoaded: false, ...quest })
    })
    .catch((error) => {
      handleError(error)
    })
}

const getAswers = (level, id) => {
  fetch(`http://localhost:8080/question/${id}/answers/list`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
      const answer = response.answer
      setAnswerList( answer )
    })
    .catch((error) => {
      handleError(error)
    })
}

const sumXp = (id, xp) => {
  fetch(`http://localhost:8080/user/${id}/xp/${xp}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
    })
    .catch((error) => {
      handleError(error)
    })
}

const generateQuestionMenu = () => {
  return answerList.map((ans) => (
    <li key={`Q${question.id}-A${ans.id}`} className="list-group-item">
      <span onClick={() => handleAnswer(ans.id)} className={`btn ${ ans.id===answer ? "text-bg-success" : "btn-warning"} w-100 fw-bold hover my-2`}>{ans.description}</span>
    </li>
  ))
}

useEffect(() => {
  getQuestion(level, question.id)
  getAswers(level, question.id)
}, [id])

useEffect(() => {
  if(!signed) history.push("/")
}, [signed])

return (
    <div className="container-fluid py-4 level">
      <div className="container py-4 card-group card-group-bg rounded-5 card-group justify-content-evenly" >
        <div className="col-4 text-center">
          <div className="card-body-level px-4 py-4">
            <p className='text-light fw-bold fs-4'>Fase {question.id} - {question.points} XP</p>
            <p className='text-light text-wrap text-break pt-3'>{question.description}</p>
            <div className="position-absolute fixed-bottom p-3 mb-3">
              <button onClick={() => handleAssert()} className="btn btn-warning w-75 fw-bold fs-3 hover">Responder</button>
            </div>
          </div>
        </div>
        <div className="col-4 text-center">
          <ul className="card-body-level p-5 mx-4">
            <li className="list-group-item">
            </li>
            {generateQuestionMenu()}
          </ul>
        </div>
      </div>
    </div>
)
}

export default Question