import { Link } from 'react-router-dom';

export default function OrderPage() {
  return (
    <main className="page-content">
      <div className="page-hero page-hero-purple">
        <h1>PLACE YOUR ORDER</h1>
        <p>Pick-up, delivery, or catering — we've got you covered</p>
      </div>

      <section className="order-page-section">
        <div className="order-options">
          <div className="order-option">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <h3>Pick-Up</h3>
            <p>Order ahead and pick up at our kitchen. Ready in 30 minutes!</p>
            <Link to="/contact" className="btn-secondary">ORDER FOR PICK-UP</Link>
          </div>
          <div className="order-option">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <h3>Delivery</h3>
            <p>We deliver to your door! Available within the San Antonio area.</p>
            <Link to="/contact" className="btn-secondary">ORDER FOR DELIVERY</Link>
          </div>
          <div className="order-option">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6b4c7a" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
            <h3>Catering</h3>
            <p>Perfect for parties, events, and gatherings! Feed 20–200+ guests.</p>
            <Link to="/contact" className="btn-secondary">INQUIRE ABOUT CATERING</Link>
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
