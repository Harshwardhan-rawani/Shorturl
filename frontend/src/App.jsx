import { useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landingpage from './component/Landingpage'
import { AnimatePresence } from 'framer-motion'
import Card from './component/Card'
import Analytics from './component/Analytics'
import Navbar from './component/Navbar'
import PrivateRoute from './component/PrivateRoute'
import Login from './component/Login'
import Signup from './component/Signup'
import RedirectPage from './component/RedirectPage'

function App() {
  const location = useLocation();
  
  return (
    <>
   
        <Navbar />
        <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landingpage />} />
          <Route path="/card" element={<PrivateRoute element={<Card />}/> } />
          <Route path="/login" element={<Login />} />
          <Route path="/redirect/:shortId" element={<RedirectPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
