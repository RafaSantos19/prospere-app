import React, { createContext, useState } from "react"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    email: "user@gmail.com", id: "3", name: "User", xp: 1000,
    err: { status: false, msg: '' }
  })

  const handleState = (state) => {
    setUser({ ...user, ...state})
  }

  async function Login(form) {
    fetch("http://localhost:8080/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ...form })
    })
    .then(response => response.json())
    .then((response) => {
      if (response['message']) {
        throw new Error(response['message'])
      }
      handleState({ ...response.user })
    })
    .catch((error) => {
      handleState({
        err:{
          status: Boolean(error.message),
          msg: error.message
        }
      })
    })
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, err: user.err, Login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
