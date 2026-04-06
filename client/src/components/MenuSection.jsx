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
                name={`flavor-home-${item._id}`} 
                value="Pork" 
                checked={selectedFlavor === 'Pork'} 
                onChange={() => setSelectedFlavor('Pork')} 
              />
              <div className="flavor-card">Classic Pork</div>
            </label>
            <label className="flavor-option">
              <input 
                type="radio" 
                name={`flavor-home-${item._id}`} 
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
          {item.customizable && <a href="#order" className="customize-link">Customize</a>}
        </div>
        <button
          className={`btn-add-cart ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ ADDED TO TRAY!' : '🛒 ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => { setMenuItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="menu-section" id="menu">
        <h2 className="section-title">OUR LUMPIA FAMILY</h2>
        <p style={{ textAlign: 'center', color: '#6b4c7a' }}>Loading menu...</p>
      </section>
    );
  }

  return (
    <section className="menu-section" id="menu">
      <h2 className="section-title">OUR LUMPIA FAMILY</h2>
      <div className="menu-grid">
        {menuItems.map(item => <MenuCard key={item._id} item={item} />)}
      </div>
    </section>
  );
}
