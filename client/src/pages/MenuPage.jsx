import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => { addToCart(item); setAdded(true); setTimeout(() => setAdded(false), 800); };

  return (
    <div className="menu-card">
      <div className="menu-card-image" style={{ backgroundColor: item.bgColor }}>
        <div className="food-emoji">{item.emoji}</div>
      </div>
      <div className="menu-card-info">
        <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="price-row">
          <span className="price">${item.price.toFixed(2)}</span>
          {item.customizable && <span className="customize-link">Customize</span>}
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? '✓ ADDED!' : '🛒 ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(data => { setMenuItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>OUR MENU</h1>
        <p>Authentic Filipino flavors, made with love</p>
      </div>

      <section className="menu-page-section">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b4c7a', padding: '3rem' }}>Loading menu...</p>
        ) : (
          <>
            <h2 className="menu-category-title">Lumpia Family</h2>
            <div className="menu-grid">
              {menuItems.map(item => <MenuCard key={item._id} item={item} />)}
            </div>
            {menuItems.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6b4c7a', padding: '3rem' }}>No items in the menu yet.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
