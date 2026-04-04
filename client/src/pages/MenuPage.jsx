import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState('Pork');

  const handleAdd = () => { 
    addToCart(item, selectedFlavor); 
    setAdded(true); 
    setTimeout(() => setAdded(false), 800); 
  };

  return (
    <div className="menu-card">
      <div className="menu-card-image" style={{ backgroundColor: item.bgColor }}>
        <div className="food-emoji">{item.emoji}</div>
      </div>
      <div className="menu-card-info">
        <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        
        <div className="flavor-selection" style={{ margin: '10px 0' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Choose Flavor:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="radio" name={`flavor-${item._id}`} value="Pork" checked={selectedFlavor === 'Pork'} onChange={() => setSelectedFlavor('Pork')} />
              Pork
            </label>
            <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="radio" name={`flavor-${item._id}`} value="Chicken" checked={selectedFlavor === 'Chicken'} onChange={() => setSelectedFlavor('Chicken')} />
              Chicken
            </label>
          </div>
        </div>

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
