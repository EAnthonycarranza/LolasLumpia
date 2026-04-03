import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import AdminOrders from './AdminOrders';
import AdminMenu from './AdminMenu';

function DashboardHome({ stats }) {
  return (
    <div className="dashboard-content">
      <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#3d1f52', marginBottom: '2rem' }}>Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#6b5a4a', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b4c7a', marginTop: '0.5rem' }}>{stats?.totalOrders || 0}</p>
        </div>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#6b5a4a', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c9a84c', marginTop: '0.5rem' }}>{stats?.pendingOrders || 0}</p>
        </div>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#6b5a4a', textTransform: 'uppercase', letterSpacing: '1px' }}>Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2e7d32', marginTop: '0.5rem' }}>${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
      
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', marginBottom: '1.5rem' }}>Recent Orders</h3>
        {stats?.recentOrders?.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #f5f0e8' }}>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Total</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f5f0e8' }}>
                  <td style={{ padding: '0.75rem' }}>{order.customerName}</td>
                  <td style={{ padding: '0.75rem' }}>${order.total.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      background: order.status === 'pending' ? '#fff3e0' : '#e8f5e9',
                      color: order.status === 'pending' ? '#ef6c00' : '#2e7d32'
                    }}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No orders yet.</p>}
      </div>
    </div>
  );
}

function SettingsEditor() {
  const { settings, refreshSettings } = useSettings();
  const { token } = useAuth();
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (settings) setForm({ ...settings });
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('Settings updated successfully!');
        refreshSettings();
      }
    } catch {
      setStatus('Failed to update settings.');
    }
    setTimeout(() => setStatus(''), 3000);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#3d1f52', marginBottom: '2rem' }}>Store Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>General Information</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label>Business Name
              <input type="text" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </label>
            <label>Location
              <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <label>Phone
                <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
              </label>
              <label>Email
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
              </label>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Business Hours</h3>
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {Object.keys(form.hours).map(day => (
              <label key={day} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ width: '150px' }}>{day}</span>
                <input 
                  type="text" 
                  value={form.hours[day]} 
                  onChange={e => {
                    const newHours = { ...form.hours };
                    newHours[day] = e.target.value;
                    setForm({ ...form, hours: newHours });
                  }} 
                  style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #ddd' }} 
                />
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Hero & About</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label>Hero Heading (use \n for line break)
              <textarea value={form.heroHeading} onChange={e => setForm({...form, heroHeading: e.target.value})} rows="3" style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </label>
            <label>About Title
              <input type="text" value={form.aboutTitle} onChange={e => setForm({...form, aboutTitle: e.target.value})} style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </label>
            <label>About Text
              <textarea value={form.aboutText} onChange={e => setForm({...form, aboutText: e.target.value})} rows="5" style={{ width: '100%', padding: '0.6rem', marginTop: '0.3rem', borderRadius: '6px', border: '1px solid #ddd' }} />
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button type="submit" className="btn-primary" style={{ padding: '0.8rem 2rem' }}>SAVE CHANGES</button>
          {status && <span style={{ fontWeight: 'bold', color: '#6b4c7a' }}>{status}</span>}
        </div>
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const { isAdmin, token, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      // Small delay to allow AuthContext to check token
      const timer = setTimeout(() => {
        if (!isAdmin) navigate('/admin/login');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (token) {
      fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setStats)
        .catch(() => {});
    }
  }, [token]);

  if (!isAdmin) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f0e8' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        background: '#3d1f52', 
        color: '#fff', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '2rem 0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 1rem' }}>
          <img src="/images/logo.png" alt="Logo" style={{ width: '60px', borderRadius: '50%', marginBottom: '0.5rem' }} />
          <h1 style={{ fontSize: '1.2rem', fontFamily: '"Playfair Display", serif' }}>Lola's Admin</h1>
        </div>
        
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Link to="/admin" style={{ display: 'block', padding: '1rem 2rem', color: '#fff', textDecoration: 'none', borderLeft: '4px solid transparent' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/orders" style={{ display: 'block', padding: '1rem 2rem', color: '#fff', textDecoration: 'none', borderLeft: '4px solid transparent' }}>Orders</Link>
            </li>
            <li>
              <Link to="/admin/menu" style={{ display: 'block', padding: '1rem 2rem', color: '#fff', textDecoration: 'none', borderLeft: '4px solid transparent' }}>Menu</Link>
            </li>
            <li>
              <Link to="/admin/settings" style={{ display: 'block', padding: '1rem 2rem', color: '#fff', textDecoration: 'none', borderLeft: '4px solid transparent' }}>Settings</Link>
            </li>
          </ul>
        </nav>
        
        <div style={{ padding: '0 2rem' }}>
          <button onClick={logout} style={{ 
            width: '100%', 
            padding: '0.6rem', 
            background: 'transparent', 
            border: '2px solid #9b7aad', 
            color: '#fff', 
            borderRadius: '6px',
            cursor: 'pointer'
          }}>LOGOUT</button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ margin: 0 }}>Welcome back, Lola</h2>
          <Link to="/" target="_blank" style={{ color: '#6b4c7a', fontWeight: 'bold' }}>View Website &rarr;</Link>
        </header>
        
        <Routes>
          <Route path="/" element={<DashboardHome stats={stats} />} />
          <Route path="/orders" element={<AdminOrders />} />
          <Route path="/menu" element={<AdminMenu />} />
          <Route path="/settings" element={<SettingsEditor />} />
        </Routes>
      </main>
    </div>
  );
}
