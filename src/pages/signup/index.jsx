import React, { useState, useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import banner from '../../assets/signup_banner.svg'
import AuthContext from '../../context/auth';

import './style.scss'

function Signup() {

  const { signed } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const [err, setErr] = useState({ status: false, msg: "" })

  const handleChange = (event) => {
    let input = {}
    input[event.target.id] = event.target.value
    setForm({ ...form, ...input })
  }

  const handleSignup = () => {
    fetch("http://localhost:8080/auth/signup", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ...state.user })
    })
      .then(response => response.json())
      .then((response) => {
        if (response['message']) {
          throw new Error(response['message'])
        }
        setIsLoaded(Boolean(response.id))
      })
      .catch((error) => {
        setErr({
          status: Boolean(error.message),
          msg: error.message
        })
      })
  }

  return (
    <>
      {
        // signed
        // ? <Redirect to={{ pathname: "/home" }} />
        // :
        isLoaded
          ? <Redirect to="/login" />
          : null
      }
      <div className="container-fluid h-100 py-5 main-login">
        <div className="row my-2">
          <h1 className="w-100 text-center login-title">Cadastre-se para um cosmos de conhecimento</h1>
        </div>
        <div className="card-group justify-content-evenly mb-4" >
          <div className="col-6 text-center">
            <div className='card-img-top hover'>
              <img src={banner} alt="" className='image-login' />
            </div>
          </div>
          <div className="col-4">
            <div className="card-login h-100 w-100 text-center px-3 py-2 m-2">
              <div className="card-body w-100 px-2 my-2">
                <h1 className='login-title'>Cadastre-se</h1>
                <div className="textfield my-3">
                  <label htmlFor="email">Nome</label>
                  <input
                    value={form.name || ''}
                    onChange={handleChange}
                    id="name"
                    type="name"
                    name="name"
                    required={true}
                    placeholder="Nome" />
                </div>
                <div className="textfield my-2">
                  <label htmlFor="email">E-mail</label>
                  <input
                    value={form.email || ''}
                    onChange={handleChange}
                    id="email"
                    type="email"
                    name="email"
                    required={true}
                    placeholder="E-mail" />
                </div>
                <div className="textfield my-2">
                  <label htmlFor="password">Senha</label>
                  <input
                    value={form.password || ''}
                    onChange={handleChange}
                    id="password"
                    type="password"
                    name="password"
                    required={true}
                    placeholder="Senha" />
                </div>
                <div className='align-self-center my-2'>
                  <button className="btn btn-warning btn-large w-100 my-4" onClick={() => handleSignup()}>Cadastrar-se</button>
                </div>
                <span className="position-absolute translate-middle my-4">
                  <Toast className='btn btn-danger btn-sm' onClose={() => handleError({})} show={err.status} delay={5000} autohide={true}>
                    {err.msg.toUpperCase()}
                  </Toast>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup