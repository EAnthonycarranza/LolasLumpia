import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
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
        </div>
        <button className={`btn-add-cart ${added ? 'added' : ''}`} onClick={handleAdd}>
          {added ? '✓ ADDED!' : '🛒 ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { settings } = useSettings();
  const [reviews, setReviews] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(setReviews).catch(() => {});
    fetch('/api/menu').then(r => r.json()).then(items => setFeatured(items.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <>
      {/* Hero */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src="/images/logo.png" alt="Lola's Lumpia Logo" className="hero-logo" />
          <h1>{settings?.heroHeading?.split('\n')[0] || "AUTHENTIC FILIPINO LUMPIA"}</h1>
          <p className="hero-subtitle">{settings?.heroHeading?.split('\n')[1] || "From Lola's Kitchen to Yours"}</p>
          <Link to="/menu" className="btn-primary">BROWSE MENU</Link>
        </div>
      </header>

      <main>
        {/* About Preview + Reviews */}
        <section className="home-about-section">
          <div className={`about-grid ${reviews.length === 0 ? 'no-reviews' : ''}`}>
            {/* Meet Lola */}
            <div className={`meet-lola home-lola ${reviews.length === 0 ? 'full-width' : ''}`}>
              <div className="lola-image-wrapper">
                <img src="/images/logo.png" alt="Emma Long" className="lola-image" />
              </div>
              <div className="lola-text">
                <h2>{settings?.aboutTitle || 'MEET Lola - EMMA LONG'}</h2>
                <p>{settings?.aboutText || "Emma Long has been perfecting her family's lumpia recipe for over thirty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren."}</p>
                <Link to="/our-story" className="learn-more">Learn More</Link>
              </div>
            </div>

            {/* Reviews - ONLY if there are real reviews in MongoDB */}
            {reviews.length > 0 && (
              <aside className="reviews-sidebar">
                <h3>Customer Reviews</h3>
                {reviews.slice(0, 3).map(review => (
                  <div key={review._id} className="review-card">
                    <div className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                    <p className="review-title">{review.title}</p>
                    <p>"{review.body}"</p>
                    <span className="reviewer">— {review.name}</span>
                  </div>
                ))}
              </aside>
            )}
          </div>
        </section>

        {/* Featured Menu */}
        <section className="menu-section">
          <h2 className="section-title">OUR LUMPIA FAMILY</h2>
          <div className="menu-grid">
            {featured.map(item => <MenuCard key={item._id} item={item} />)}
          </div>
          <div className="section-cta">
            <Link to="/menu" className="btn-primary">VIEW FULL MENU</Link>
          </div>
        </section>

        {/* How it Works */}
        <section className="how-it-works-section">
          <h2 className="section-title">HOW IT WORKS</h2>
          <div className="steps-row">
            <div className="step-card">
              <div className="step-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <h3>Select</h3>
              <p>Choose from our lumpia family and Filipino favorites</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3>Schedule</h3>
              <p>Pick-up or delivery — choose what works for you</p>
            </div>
            <div className="step-connector">→</div>
            <div className="step-card">
              <div className="step-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
                </svg>
              </div>
              <h3>Enjoy</h3>
              <p>Fresh, authentic Filipino food from Lola's kitchen</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
