// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import VRMManagement from './pages/vrm-management'
import ShowPage from './pages/show-page'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VRMManagement />} />
        <Route path="/show" element={<ShowPage />} />
      </Routes>
    </Router>
  )
}

export default App