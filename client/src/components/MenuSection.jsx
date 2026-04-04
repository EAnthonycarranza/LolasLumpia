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
              <input type="radio" name={`flavor-home-${item._id}`} value="Pork" checked={selectedFlavor === 'Pork'} onChange={() => setSelectedFlavor('Pork')} />
              Pork
            </label>
            <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input type="radio" name={`flavor-home-${item._id}`} value="Chicken" checked={selectedFlavor === 'Chicken'} onChange={() => setSelectedFlavor('Chicken')} />
              Chicken
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
          {added ? '✓ ADDED!' : '🛒 ADD TO CART'}
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
