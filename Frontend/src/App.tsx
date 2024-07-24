import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login'
import { Register } from './components/Register'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/auth/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
