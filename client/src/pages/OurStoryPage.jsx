import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function OurStoryPage() {
  const { settings } = useSettings();

  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>OUR STORY</h1>
        <p>The heart and soul behind every lumpia</p>
      </div>

      <section className="story-content">
        <div className="story-main">
          <div className="story-image-wrapper">
            <img src="/images/logo.png" alt="Emma Long" className="story-image" />
          </div>
          <div className="story-text">
            <h2>{settings?.aboutTitle || 'MEET Lola - EMMA LONG'}</h2>
            <p>Emma Long has been perfecting her family's lumpia recipe for over thirty years. Her secret is patience and the freshest local ingredients. Every lumpia is hand-rolled and cooked with the same love she has for her grandchildren.</p>
            <p>What started as a family tradition has grown into a beloved local business. Every morning, Emma arrives at the kitchen before dawn, preparing the freshest ingredients for the day's lumpia. Her grandchildren now work alongside her, learning the techniques she perfected over decades.</p>
            <p>At Lola's Lumpia — named for Emma, the cherished 'Lola' (grandmother) of our family — we believe food is more than sustenance — it's a way to share love, culture, and tradition. Every bite of our lumpia carries the warmth of Filipino hospitality and the rich flavors of authentic home cooking.</p>
          </div>
        </div>

        <div className="story-values">
          <div className="value-card">
            <h3>Fresh Ingredients</h3>
            <p>We source the freshest local produce and premium meats daily. No shortcuts, no compromises.</p>
          </div>
          <div className="value-card">
            <h3>Hand-Rolled</h3>
            <p>Every single lumpia is hand-rolled with care, just like Lola taught us. It's the only way.</p>
          </div>
          <div className="value-card">
            <h3>Family Recipe</h3>
            <p>Our secret spice blend has been passed down for three generations. You can taste the tradition.</p>
          </div>
        </div>

        <div className="story-location">
          <div className="location-info">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h3>{settings?.location || 'San Antonio, TX'}</h3>
            <p>Proudly serving authentic Filipino food</p>
          </div>
        </div>

        <div className="order-cta">
          <h2>Ready to Order?</h2>
          <p>Browse our full menu and add items to your cart, or contact us directly for custom orders and catering.</p>
          <div className="order-cta-buttons">
            <Link to="/menu" className="btn-primary">BROWSE MENU</Link>
            <Link to="/contact" className="btn-secondary">CONTACT US</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
