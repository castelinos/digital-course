import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedComponent from './components/ProtectedRoute.tsx'; // Assume this is the component you want to protect
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import { ResponsiveProvider } from './context/PlatformContext.tsx';
import Lessons from './components/VideoGallery.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ResponsiveProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ProtectedComponent children={<Home />} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lessons"
            element={
              <ProtectedRoute>
                <ProtectedComponent children={<Lessons />} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
