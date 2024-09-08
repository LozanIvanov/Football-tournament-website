import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'

function App() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
