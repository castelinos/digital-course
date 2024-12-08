import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import { ResponsiveProvider } from "./context/PlatformContext.tsx";
import Lessons from "./pages/Lessons.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";

import Users from "./pages/admin-dashboard/Users.tsx";
import DashboardLayout from "./components/layouts/DashboardLayout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResponsiveProvider>
        <AuthProvider>
          <Routes>
            {/* Added Route to redirect root to login */}
            <Route path="/" element={<Navigate to="/login" />} />
            {/* Added /login as login element route */}
            <Route path="/login" element={<Login />} />
            {/* Register User route */}
            <Route
              path="/get-user"
              element={
                <ProtectedRoute level="admin">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute level="user">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lessons"
              element={
                <ProtectedRoute level="user">
                  <Lessons />
                </ProtectedRoute>
              }
            />
            <Route path="/:order/order-success" element={<OrderSuccess />} />

            {/* Admin routes */}
            
            <Route element={<DashboardLayout />}>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute level="admin">
                    <Users />
                  </ProtectedRoute>
                }
              />
            </Route>

          </Routes>
        </AuthProvider>
      </ResponsiveProvider>
    </BrowserRouter>
  </React.StrictMode>
);
