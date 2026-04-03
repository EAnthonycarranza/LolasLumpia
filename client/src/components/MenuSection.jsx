import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

function MenuCard({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
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

  const lumpia = menuItems.filter(i => i.category === 'lumpia');
  const entrees = menuItems.filter(i => i.category === 'entree');
  const desserts = menuItems.filter(i => i.category === 'dessert');

  if (loading) {
    return (
      <section className="menu-section" id="menu">
        <h2 className="section-title">OUR LUMPIA FAMILY</h2>
        <p style={{ textAlign: 'center', color: '#6b4c7a' }}>Loading menu...</p>
      </section>
    );
  }

  return (
    <>
      <section className="menu-section" id="menu">
        <h2 className="section-title">OUR LUMPIA FAMILY</h2>
        <div className="menu-grid">
          {lumpia.map(item => <MenuCard key={item._id} item={item} />)}
        </div>
      </section>

      {(entrees.length > 0 || desserts.length > 0) && (
        <section className="more-food-section">
          <h2 className="section-title">MORE FILIPINO FAVORITES</h2>
          <div className="menu-grid">
            {[...entrees, ...desserts].map(item => <MenuCard key={item._id} item={item} />)}
          </div>
        </section>
      )}
    </>
  );
}
