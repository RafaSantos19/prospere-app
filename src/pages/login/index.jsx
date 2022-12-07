import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import AuthContext from '../../context/auth';

import './style.scss';
import banner from '../../assets/login_banner.svg';

function Login() {
  const { Login, signed, err } = useContext(AuthContext);
  const history = useHistory()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [showToast, setShowToast] = useState(false)

  const handleChange = (event) => {
    let input = {}
    input[event.target.id] = event.target.value
    setForm({ ...form, ...input })
  }

  const handleError = (error) => {
    setShowToast(error)
  }

  const handleLogin = () => {
    Login(form)
    history.push("/home")
  }

  useEffect(() => {
    handleError(err?.status)
  }, [err])

  // useEffect(() => {
  //   if(signed) history.push("/home")
  // }, [signed])

  return (
      <div className="container-fluid h-100 py-5 main-login">
        <div className="row my-2">
          <h1 className="w-100 text-center login-title">Faça login para um cosmos de conhecimento </h1>
        </div>
        <div className="card-group justify-content-evenly" >
          <div className="col-6 text-center">
            <div className='card-img-top hover'>
              <img src={banner} alt="" className='image-login' />
            </div>
          </div>
          <div className="col-4">
            <div className="card-login h-100 w-100 text-center px-3 py-2 m-2">
              <div className="card-body w-100 px-2 my-2">
                <h1 className='login-title'>Login</h1>
                <div className="textfield my-3">
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
                <div className="textfield my-3">
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
                  <button className="btn btn-warning btn-large w-100 my-4 buttonico" onClick={() => handleLogin()}>Login</button>
                  <span className="text-light">Não tem conta? <a href="/signup">Cadastre-se</a> </span>
                </div>
                <span className="position-absolute translate-middle my-4">
                  <Toast className='btn btn-danger btn-sm' onClose={() => handleError(false)} show={showToast} delay={5000} autohide={true}>
                    {err?.msg.toUpperCase()}
                  </Toast>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login