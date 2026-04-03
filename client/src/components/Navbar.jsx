import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/our-story', label: 'OUR STORY' },
    { to: '/menu', label: 'MENU' },
    { to: '/order', label: 'ORDER' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <nav className="main-nav">
        <div className="nav-links">
          {navLinks.map((link, i) => (
            <span key={link.to}>
              {i > 0 && <span className="nav-divider">|</span>}
              <Link to={link.to} className={location.pathname === link.to ? 'active' : ''}>
                {link.label}
              </Link>
            </span>
          ))}
        </div>
        <button className="cart-btn" onClick={() => setIsOpen(true)} aria-label="Shopping cart">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="cart-count">{totalItems}</span>
        </button>
        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'active' : ''}`}>
        <div className="mobile-nav-content">
          {navLinks.map((link, index) => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: `${index * 0.1}s` }}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
