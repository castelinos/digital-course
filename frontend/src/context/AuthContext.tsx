// src/context/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, FunctionComponent } from 'react';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultState: AuthContextType = {
  user: null,
  login: async () => {}, // Assuming login could be an async operation
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultState);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

// Utilizing `FunctionComponent` (or `FC`) from React for defining functional components
export const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string) => {
    setUser({ username });
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };

  //@ts-ignore
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
