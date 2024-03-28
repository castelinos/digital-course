// src/hooks/useRequireAuth.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function useRequireAuth(redirectUrl = '/') {
  const auth = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (auth.user === null) {
      navigate(redirectUrl);
    }

  }, [auth.user]);

  return auth.user;
}
