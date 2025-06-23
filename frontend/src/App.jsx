// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

import NavigationBar from './components/Navbar.jsx'
import Signin from './pages/Signin.jsx'

function App() {
  return (
    <>
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/signin' element={<Signin/>} />
        </Routes>
    </>
  )
}

export default App
