import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import LessonsNew from './pages/LessonsNew'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/lessons' element={<LessonsNew />} />
      </Routes>
    </>
  )
}

export default App
