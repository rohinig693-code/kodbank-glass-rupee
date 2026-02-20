import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  accountNumber: string;
  ifscCode: string;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUser: User = {
  id: '1',
  name: 'Arjun Mehta',
  email: 'arjun@kodbank.in',
  phone: '+91 98765 43210',
  accountNumber: '4521 7890 1234 5678',
  ifscCode: 'KODB0001234',
  joinedDate: '2024-03-15',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('kodbank_auth');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...mockUser, email };
    setUser(u);
    localStorage.setItem('kodbank_auth', JSON.stringify(u));
  }, []);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...mockUser, name, email };
    setUser(u);
    localStorage.setItem('kodbank_auth', JSON.stringify(u));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('kodbank_auth');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
