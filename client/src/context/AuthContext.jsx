import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.ok) setIsAdmin(true);
        else { setIsAdmin(false); setToken(null); localStorage.removeItem('adminToken'); }
      }).catch(() => { setIsAdmin(false); });
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    localStorage.setItem('adminToken', data.token);
    setToken(data.token);
    setIsAdmin(true);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
