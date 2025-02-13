import './App.css'
import Board from './components/Board'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/board" element={<Board />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
