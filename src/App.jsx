import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import Germany from './pages/Germany';
import Players from './pages/Players';
import Matches from './pages/Matches';

function App() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='/germany'  element={<Germany/>} />
        <Route path='/players'  element={<Players/>} />
        <Route path='/matches'  element={<Matches/>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
