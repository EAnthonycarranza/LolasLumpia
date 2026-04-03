import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMenu();
    } catch {
      alert('Failed to delete item');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingItem._id ? 'PUT' : 'POST';
    const url = editingItem._id ? `/api/admin/menu/${editingItem._id}` : '/api/admin/menu';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingItem)
      });
      if (res.ok) {
        setEditingItem(null);
        fetchMenu();
      }
    } catch {
      alert('Failed to save item');
    }
  };

  if (loading) return <div>Loading menu...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: '"Playfair Display", serif', color: '#3d1f52', margin: 0 }}>Manage Menu</h2>
        <button onClick={() => setEditingItem({ name: '', description: '', price: 0, category: 'lumpia', emoji: '🥟', bgColor: '#f5f0e8' })} className="btn-primary" style={{ padding: '0.6rem 1.2rem' }}>+ ADD ITEM</button>
      </div>

      {editingItem && (
        <div style={{ 
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }}>
          <form onSubmit={handleSave} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px' }}>
            <h3>{editingItem._id ? 'Edit Item' : 'New Item'}</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <input type="text" placeholder="Name" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} required style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }} />
              <textarea placeholder="Description" value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} required style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="number" step="0.01" placeholder="Price" value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} required style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }} />
                <select value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}>
                  <option value="lumpia">Lumpia</option>
                  <option value="entree">Entree</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="text" placeholder="Emoji" value={editingItem.emoji} onChange={e => setEditingItem({...editingItem, emoji: e.target.value})} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #ddd' }} />
                <input type="color" value={editingItem.bgColor} onChange={e => setEditingItem({...editingItem, bgColor: e.target.value})} style={{ height: '40px', padding: '2px', width: '100%', borderRadius: '6px', border: '1px solid #ddd' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>SAVE</button>
              <button type="button" onClick={() => setEditingItem(null)} style={{ flex: 1, background: '#eee', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>CANCEL</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {items.map(item => (
          <div key={item._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem', background: item.bgColor, width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h3>
                <p style={{ margin: '0.3rem 0', color: '#6b5a4a', fontSize: '0.85rem' }}>{item.description}</p>
                <div style={{ fontWeight: 'bold', color: '#6b4c7a' }}>${item.price.toFixed(2)}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button onClick={() => setEditingItem(item)} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #9b7aad', color: '#6b4c7a', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>EDIT</button>
              <button onClick={() => handleDelete(item._id)} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #ffcdd2', color: '#c62828', background: 'transparent', cursor: 'pointer', fontWeight: 'bold' }}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
