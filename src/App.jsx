import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Protected routes:
      const protectedRoutes = ['/', '/player'];

      // If user is NOT logged in & trying to access protected pages → go to login
      if (!user && protectedRoutes.some(path => location.pathname.startsWith(path))) {
        navigate('/login');
      }

      // If user IS logged in & tries to go to login → go to home
      if (user && location.pathname === '/login') {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
