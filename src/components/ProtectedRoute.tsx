// src/components/ProtectedRoute.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  level: 'admin'|'user';
  children: ReactNode;
}

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const ProtectedRoute = ({ level, children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  let searchParams;

  switch (level) {
    case "user":
      if (!user) return <Navigate to="/login" replace />;
      break;
    case "admin":
      searchParams = new URL(window.location.href).searchParams;
      
      if( searchParams.get('admin_email') !== ADMIN_EMAIL ){
        return <Navigate to="/login" replace />;
      }

      break;
    default:
      return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
