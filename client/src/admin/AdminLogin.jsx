import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #3d1f52 0%, #6b4c7a 100%)',
      padding: '2rem'
    }}>
      <div className="login-card" style={{
        background: '#fff',
        padding: '2.5rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <img src="/images/logo.png" alt="Lola's Lumpia" style={{ width: '100px', borderRadius: '50%', marginBottom: '1.5rem' }} />
        <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#3d1f52', marginBottom: '1.5rem' }}>Admin Login</h2>
        
        {error && <div style={{ color: '#d9534f', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Username" 
            required 
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '2px solid #9b7aad', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '2px solid #9b7aad', outline: 'none' }}
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            LOGIN
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#6b4c7a', 
            marginTop: '1.5rem', 
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 'bold'
          }}
        >
          Back to Website
        </button>
      </div>
    </div>
  );
}
