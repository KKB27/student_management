// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'

import NavigationBar from './components/Navbar.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import Assignments from './pages/Assignments.jsx'
import SubjectsPage from './pages/Subjects.jsx'
function App() {
  return (
    <>
        
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/assignments' element={<Assignments/>}/>
        <Route path='/subjects' element={<SubjectsPage/>}/>
        </Routes>
    </>
  )
}

export default App
