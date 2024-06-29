import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedComponent from './components/ProtectedRoute.tsx'; // Assume this is the component you want to protect
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import { ResponsiveProvider } from './context/PlatformContext.tsx';
import Lessons from './pages/Lessons.tsx';
import BonusContent from './pages/BonusContent.tsx';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <Routes>
            {/* Added Route to redirect to register */}
            <Route path="/" element={<Navigate to="/get-user" />} />
            {/* Added /login as login element route */}
            <Route path="/login" element={<Login />} />
            {/* Register User route */}
            <Route path="/get-user" element={<Register />} />
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
            <Route
              path="/bonus-content"
              element={
                <ProtectedRoute>
                  <ProtectedComponent children={<BonusContent />} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  </React.StrictMode>
);
