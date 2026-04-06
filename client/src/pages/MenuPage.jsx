import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [shaking, setShaking] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAdd = () => { 
    if (!selectedFlavor) {
      setShaking(true);
      setShowError(true);
      setTimeout(() => setShaking(false), 400);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    addToCart(item, selectedFlavor); 
    setAdded(true); 
    setTimeout(() => setAdded(false), 800); 
  };

  return (
    <div className={`menu-card ${shaking ? 'shake' : ''}`}>
      <div className={`error-popup ${showError ? 'active' : ''}`}>
        <span className="error-popup-icon">⚠️</span>
        <h4>Selection Needed!</h4>
        <p>Please select a Lumpia Kind (flavor) before adding to tray.</p>
      </div>
      <div className="menu-card-image" style={{ backgroundColor: item.bgColor }}>
        <div className="food-emoji">{item.emoji}</div>
      </div>
      <div className="menu-card-info">
        <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        
        <div className="menu-step-tag">Step 1: Choose Size</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        
        <div className="flavor-selection">
          <span className="menu-step-tag">Step 2: Choose Flavor</span>
          <label className="flavor-label">Lumpia Kind:</label>
          <div className="flavor-options">
            <label className="flavor-option">
              <input 
                type="radio" 
                name={`flavor-${item._id}`} 
                value="Pork" 
                checked={selectedFlavor === 'Pork'} 
                onChange={() => setSelectedFlavor('Pork')} 
              />
              <div className="flavor-card">Classic Pork</div>
            </label>
            <label className="flavor-option">
              <input 
                type="radio" 
                name={`flavor-${item._id}`} 
                value="Chicken" 
                checked={selectedFlavor === 'Chicken'} 
                onChange={() => setSelectedFlavor('Chicken')} 
              />
              <div className="flavor-card">Savory Chicken</div>
            </label>
          </div>
        </div>

        <div className="price-row">
          <span className="price">${item.price.toFixed(2)}</span>
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? '✓ ADDED TO TRAY!' : '🛒 ADD TO CART'}
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
