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
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(data => { setMenuItems(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const lumpia = menuItems.filter(i => i.category === 'lumpia');
  const entrees = menuItems.filter(i => i.category === 'entree');
  const desserts = menuItems.filter(i => i.category === 'dessert');

  const filtered = filter === 'all' ? menuItems
    : filter === 'lumpia' ? lumpia
    : filter === 'entree' ? entrees
    : desserts;

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>OUR MENU</h1>
        <p>Authentic Filipino flavors, made with love</p>
      </div>

      <section className="menu-page-section">
        <div className="menu-filters">
          {['all', 'lumpia', 'entree', 'dessert'].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f === 'all' ? 'All Items' : f === 'lumpia' ? 'Lumpia' : f === 'entree' ? 'Entrees' : 'Desserts'}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b4c7a', padding: '3rem' }}>Loading menu...</p>
        ) : (
          <>
            {(filter === 'all' || filter === 'lumpia') && lumpia.length > 0 && (
              <>
                {filter === 'all' && <h2 className="menu-category-title">Lumpia Family</h2>}
                <div className="menu-grid">{lumpia.map(item => <MenuCard key={item._id} item={item} />)}</div>
              </>
            )}
            {(filter === 'all' || filter === 'entree') && entrees.length > 0 && (
              <>
                {filter === 'all' && <h2 className="menu-category-title">Filipino Favorites</h2>}
                <div className="menu-grid">{entrees.map(item => <MenuCard key={item._id} item={item} />)}</div>
              </>
            )}
            {(filter === 'all' || filter === 'dessert') && desserts.length > 0 && (
              <>
                {filter === 'all' && <h2 className="menu-category-title">Desserts</h2>}
                <div className="menu-grid">{desserts.map(item => <MenuCard key={item._id} item={item} />)}</div>
              </>
            )}
            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6b4c7a', padding: '3rem' }}>No items in this category yet.</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
