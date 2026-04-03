import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch {
      alert('Failed to update status');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#3d1f52', marginBottom: '2rem' }}>Manage Orders</h2>
      <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        {orders.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #f5f0e8' }}>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Items</th>
                <th style={{ padding: '0.75rem' }}>Total</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
                <th style={{ padding: '0.75rem' }}>Date</th>
                <th style={{ padding: '0.75rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #f5f0e8' }}>
                  <td style={{ padding: '0.75rem' }}>
                    <strong>{order.customerName}</strong><br />
                    <small>{order.customerEmail} | {order.customerPhone}</small>
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    {order.items.map((item, i) => (
                      <div key={i}>{item.qty}x {item.name}</div>
                    ))}
                  </td>
                  <td style={{ padding: '0.75rem' }}>${order.total.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      background: order.status === 'pending' ? '#fff3e0' : order.status === 'completed' ? '#e8f5e9' : '#ffebee',
                      color: order.status === 'pending' ? '#ef6c00' : order.status === 'completed' ? '#2e7d32' : '#c62828'
                    }}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No orders yet.</p>}
      </div>
    </div>
  );
}
