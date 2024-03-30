import React, { createContext, useContext, ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface ResponsiveContextType {
  isDesktopOrLaptop: boolean;
  isTabletOrMobile: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

interface ResponsiveProviderProps {
  children: ReactNode;
}

export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <ResponsiveContext.Provider value={{ isDesktopOrLaptop, isTabletOrMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = (): ResponsiveContextType => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }
  return context;
};
