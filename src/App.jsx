import React, { } from 'react';

import Routes from './routes/routes'
import Navbar from './components/navbar'
import Footer from './components/footer'

import { AuthProvider } from './context/auth'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes />
      <Footer />
    </AuthProvider>
  )
}

export default App
